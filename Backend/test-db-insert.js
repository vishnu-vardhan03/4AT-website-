async function test() {
  const payload = {
    firstName: "TestFirst",
    lastName: "TestLast",
    gender: "Male",
    country: "India",
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    email: "test@4at.academy",
    mobileNumber: "+919999999999",
    applicantType: "student",
    college: "Test University",
    programName: "Fintech Engineering",
    academicYear: "3rd Year",
    department: "Computer Science",
    highestEducation: "Undergraduate Degree",
    referredBy: "Friend"
  };

  console.log("Sending POST to http://localhost:5000/academy-leads/registrations...");
  try {
    const res = await fetch("http://localhost:5000/academy-leads/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);
  } catch (err) {
    console.error("Request failed:", err);
  }
}

test();
