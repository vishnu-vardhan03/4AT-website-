import fs from "node:fs";

const parseEnv = (path) => {
  if (!fs.existsSync(path)) return {};
  return Object.fromEntries(fs.readFileSync(path, "utf8").split(/\r?\n/).filter((line) => line && !line.startsWith("#") && line.includes("=")).map((line) => {
    const index = line.indexOf("=");
    return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "")];
  }));
};

const env = { ...parseEnv("Backend/.env"), ...parseEnv("Frontend/.env.local"), ...process.env };
const base = env.BACKEND_URL || "http://localhost:5000";
const key = env.ESSL_INTERNAL_API_KEY || "4at-local-development-essl-api-key-not-for-production";
const headers = { "content-type": "application/json", "x-essl-internal-key": key };
const results = [];
const record = (name, pass, detail = "") => results.push({ name, pass, detail });
const call = async (path, method = "GET", body) => {
  const response = await fetch(`${base}/ectms${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  const type = response.headers.get("content-type") || "";
  const value = type.includes("json") ? await response.json() : await response.text();
  return { response, value };
};
const expectOk = async (name, path, method, body) => {
  const result = await call(path, method, body);
  record(name, result.response.ok, result.response.ok ? `HTTP ${result.response.status}` : `HTTP ${result.response.status}: ${JSON.stringify(result.value)}`);
  if (!result.response.ok) throw new Error(`${name} failed`);
  return result.value;
};

const suffix = String(Date.now()).slice(-7);
const phone = `9${String(Date.now()).slice(-9)}`;
const license = `TS09${String(Date.now()).slice(-11)}`;
const employeeA = `cab.audit.a.${suffix}@example.test`;
const employeeB = `cab.audit.b.${suffix}@example.test`;
const date = new Date(Date.now() + 8 * 86400000).toISOString().slice(0, 10);

try {
  const driver = await expectOk("Admin: add valid driver", "/drivers", "POST", { name: "CAB Audit Driver", phone, license, vehicle: `TEST-${suffix}` });
  record("Driver response hides PIN hash/salt", !driver.data.pinHash && !driver.data.pinSalt, "Sensitive hashes absent");
  const invalidDriver = await call("/drivers", "POST", { name: "Bad Driver", phone: "123", license: "bad" });
  record("Driver validation: exactly 10 mobile digits and valid licence", invalidDriver.response.status === 400, `HTTP ${invalidDriver.response.status}`);
  const badLogin = await call("/driver-login", "POST", { phone, pin: "000000" });
  record("Driver login rejects wrong PIN", badLogin.response.ok && (badLogin.value === null || badLogin.value === ""), `HTTP ${badLogin.response.status}, no identity returned`);
  const login = await call("/driver-login", "POST", { phone, pin: driver.temporaryPin });
  record("Driver login accepts generated PIN", login.response.ok && login.value?.role === "driver", `HTTP ${login.response.status}`);

  await expectOk("Admin: add route vehicle", "/master/vehicle", "POST", { registration: `TEST-${suffix}`, capacity: 4, active: true });
  const bookingA = await expectOk("Employee A: create booking", "/bookings", "POST", { email: employeeA, tripDate: date, shift: "21:00", tripType: "Login", pickupPoint: "Audit Point A", zone: "Audit Zone", recurring: true });
  const bookingB = await expectOk("Employee B: create booking", "/bookings", "POST", { email: employeeB, tripDate: date, shift: "21:00", tripType: "Login", pickupPoint: "Audit Point B", zone: "Audit Zone" });
  record("Each booking receives a separate 6-digit OTP", /^\d{6}$/.test(String(bookingA.data.otp)) && /^\d{6}$/.test(String(bookingB.data.otp)) && bookingA.data.otp !== bookingB.data.otp, "OTPs are valid and different");
  const duplicate = await call("/bookings", "POST", { email: employeeA, tripDate: date, shift: "21:00", tripType: "Login", pickupPoint: "Audit Point A" });
  record("Duplicate employee trip is rejected", duplicate.response.status === 400, `HTTP ${duplicate.response.status}`);

  const routes = await expectOk("Admin: optimise routes", "/operations/optimise", "POST", { actor: "esssupport@consult-4at.com" });
  const route = routes.find((item) => item.data.bookingIds?.includes(bookingA.id) && item.data.bookingIds?.includes(bookingB.id));
  record("Multiple employees grouped into one route", Boolean(route), route ? `Route ${route.data.routeCode}, ${route.data.bookingIds.length} passengers` : "No shared route created");
  if (!route) throw new Error("Shared route was not created");
  await expectOk("Admin: assign driver to employee A", `/${bookingA.id}`, "PATCH", { actor: "esssupport@consult-4at.com", actorRole: "technician", driverPhone: phone, driverName: "CAB Audit Driver", vehicle: `TEST-${suffix}`, status: "Assigned" });
  await expectOk("Admin: assign driver to employee B", `/${bookingB.id}`, "PATCH", { actor: "esssupport@consult-4at.com", actorRole: "technician", driverPhone: phone, driverName: "CAB Audit Driver", vehicle: `TEST-${suffix}`, status: "Assigned" });

  const employeeSnapshot = await expectOk("Employee can see assigned driver", `?email=${encodeURIComponent(employeeA)}&role=employee`, "GET");
  record("Employee snapshot includes driver details", employeeSnapshot.records.some((item) => item.recordType === "driver" && item.data.phone === phone), "Assigned driver visible");
  record("Employee snapshot does not expose driver PIN material", employeeSnapshot.records.every((item) => !item.data.pinHash && !item.data.pinSalt), "No PIN hash/salt visible");
  const wrongOtp = await call(`/${bookingA.id}`, "PATCH", { actor: phone, actorRole: "driver", action: "verify-otp", otp: "000000" });
  record("Board button backend rejects incorrect OTP", wrongOtp.response.status === 400, `HTTP ${wrongOtp.response.status}`);
  await expectOk("Driver: board employee with correct OTP", `/${bookingA.id}`, "PATCH", { actor: phone, actorRole: "driver", action: "verify-otp", otp: bookingA.data.otp });

  const latitude = 17.4474, longitude = 78.3762;
  await expectOk("Driver: send live GPS update", `/${bookingA.id}`, "PATCH", { actor: phone, actorRole: "driver", action: "location", latitude, longitude, accuracy: 7, speed: 8, heading: 90 });
  const adminSnapshot = await expectOk("Admin: load live operations snapshot", "?email=esssupport%40consult-4at.com&role=technician", "GET");
  const liveA = adminSnapshot.records.find((item) => item.id === bookingA.id);
  const liveB = adminSnapshot.records.find((item) => item.id === bookingB.id);
  record("Driver GPS is stored for boarded employee", liveA?.data.latitude === latitude && liveA?.data.longitude === longitude, `Accuracy ${liveA?.data.gpsAccuracy}m`);
  record("One route GPS propagates to every active passenger", liveB?.data.latitude === latitude && liveB?.data.longitude === longitude && liveB?.data.routeLocationSourceBookingId === bookingA.id, `Employee B source booking ${liveB?.data.routeLocationSourceBookingId}`);
  await expectOk("Employee: share personal live location", `/${bookingA.id}`, "PATCH", { actor: employeeA, actorRole: "employee", action: "employee-location", latitude: 17.448, longitude: 78.377, accuracy: 9 });
  const locationSnapshot = await expectOk("Admin: refresh employee tracking", "?email=esssupport%40consult-4at.com&role=technician", "GET");
  const employeeLive = locationSnapshot.records.find((item) => item.id === bookingA.id);
  record("Admin sees employee live location", employeeLive?.data.employeeLatitude === 17.448 && employeeLive?.data.employeeLongitude === 78.377, `Accuracy ${employeeLive?.data.employeeGpsAccuracy}m`);

  const sos = await expectOk("Employee: trigger SOS", "/sos", "POST", { email: employeeA, bookingId: bookingA.id, latitude: 17.448, longitude: 78.377, message: "Synthetic CAB audit SOS" });
  record("SOS is created open with escalation recipients", sos.data.status === "Open" && sos.data.recipients?.length === 3, String(sos.data.eventCode));
  const bill = await expectOk("Employee: submit vendor bill", "/bills", "POST", { email: employeeA, vendor: "Audit Taxi Vendor", invoiceNumber: `INV-${suffix}`, amount: 425, attachmentName: "audit.pdf", attachmentType: "application/pdf", attachmentData: "data:application/pdf;base64,JVBERi0xLjQK" });
  await expectOk("Admin: approve vendor bill", `/${bill.id}`, "PATCH", { actor: "esssupport@consult-4at.com", actorRole: "technician", status: "Approved", approvalNote: "Synthetic audit approval" });
  const employeeForbidden = await call(`/${bookingB.id}`, "PATCH", { actor: employeeA, actorRole: "employee", action: "cancel" });
  record("Employee cannot change another employee's trip", employeeForbidden.response.status === 403, `HTTP ${employeeForbidden.response.status}`);
  const recurring = await expectOk("Admin: process recurring bookings", "/operations/recurring", "POST", { actor: "esssupport@consult-4at.com" });
  record("Recurring booking processor completes", typeof recurring.created === "number", `${recurring.created} created`);
  const report = await call("/reports.csv", "GET");
  record("Admin/finance CSV report downloads", report.response.ok && String(report.value).startsWith("Booking,Employee"), `HTTP ${report.response.status}`);
} catch (error) {
  record("Audit execution", false, error instanceof Error ? error.message : String(error));
}

console.log(JSON.stringify({ passed: results.filter((item) => item.pass).length, failed: results.filter((item) => !item.pass).length, results }, null, 2));
process.exitCode = results.some((item) => !item.pass) ? 1 : 0;
