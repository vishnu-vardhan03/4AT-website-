import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import edge from "selenium-webdriver/edge.js";

const baseUrl = (process.env.SELENIUM_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const browser = (process.env.SELENIUM_BROWSER ?? "chrome").toLowerCase();
const headless = process.env.SELENIUM_HEADLESS !== "false";
let driver;

async function buildDriver() {
  if (browser === "edge") {
    const options = new edge.Options();
    if (headless) options.addArguments("--headless=new");
    options.addArguments("--window-size=1440,1000", "--disable-dev-shm-usage", "--no-sandbox");
    return new Builder().forBrowser("MicrosoftEdge").setEdgeOptions(options).build();
  }
  const options = new chrome.Options();
  if (headless) options.addArguments("--headless=new");
  options.addArguments("--window-size=1440,1000", "--disable-dev-shm-usage", "--no-sandbox");
  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
}

async function open(path) {
  await driver.get(`${baseUrl}${path}`);
  await driver.wait(until.elementLocated(By.css("body")), 15_000);
}

describe("4AT production Selenium audit", () => {
  before(async () => { driver = await buildDriver(); });
  after(async () => { if (driver) await driver.quit(); });

  it("loads the public site without browser-level errors", async () => {
    await open("/");
    assert.match(await driver.getTitle(), /4AT/i);
    assert.ok((await driver.findElements(By.css("main"))).length > 0, "A main landmark is required");
    assert.ok((await driver.findElements(By.css("h1"))).length > 0, "The page needs an h1");
  });

  it("redirects unauthenticated ESSL access to the temporary organization login", async () => {
    await open("/essl");
    await driver.wait(until.urlContains("/essl/login"), 10_000);
    const email = await driver.findElement(By.css("#essl-email"));
    assert.equal(await email.isEnabled(), true);
    assert.match(await driver.findElement(By.css("main")).getText(), /temporary login/i);
  });

  it("clears a session cookie that can no longer be decrypted", async () => {
    await open("/essl/login");
    await driver.manage().addCookie({ name: "next-auth.session-token", value: "stale-after-secret-rotation", path: "/", httpOnly: true });
    await open("/essl");
    await driver.wait(until.urlContains("/essl/login"), 10_000);
    const cookies = await driver.manage().getCookies();
    assert.equal(cookies.some((cookie) => cookie.name === "next-auth.session-token"), false);
  });

  it("has no horizontal overflow at a mobile viewport", async () => {
    await driver.manage().window().setRect({ width: 390, height: 844 });
    await open("/essl/login");
    const overflow = await driver.executeScript("return document.documentElement.scrollWidth > document.documentElement.clientWidth");
    assert.equal(overflow, false);
    const button = await driver.findElement(By.xpath("//button[contains(., 'Open employee dashboard')]"));
    const rect = await button.getRect();
    assert.ok(rect.height >= 44, `Sign-in touch target is ${rect.height}px high; expected at least 44px`);
  });

  it("exposes production security headers", async () => {
    const response = await fetch(`${baseUrl}/essl/login`, { redirect: "manual" });
    assert.ok(response.headers.get("content-security-policy"));
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
  });

  it("opens an authenticated ESSL session when a staging cookie is supplied", async (context) => {
    const cookieValue = process.env.SELENIUM_SESSION_COOKIE;
    if (!cookieValue) return context.skip("Set SELENIUM_SESSION_COOKIE to exercise authenticated staging workflows");
    await open("/essl/login");
    await driver.manage().addCookie({
      name: process.env.SELENIUM_SESSION_COOKIE_NAME ?? "next-auth.session-token",
      value: cookieValue,
      path: "/",
      secure: baseUrl.startsWith("https://"),
      httpOnly: true,
    });
    await open("/essl");
    await driver.wait(until.elementLocated(By.css("#essl-main")), 15_000);
    assert.ok((await driver.findElements(By.xpath("//button[contains(., 'Raise a new ticket')]"))).length > 0);
  });
});
