import { chromium } from "playwright";

async function runDiagnosis(url = "http://localhost:3001") {
  console.log(`\n======================================================`);
  console.log(`[DIAGNOSE] Launching Chromium to test: ${url}`);
  console.log(`======================================================\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleMessages = [];
  const pageErrors = [];
  const failedRequests = [];
  const allRequests = [];

  page.on("console", (msg) => {
    const type = msg.type();
    const text = msg.text();
    consoleMessages.push({ type, text, location: msg.location() });
    if (type === "error" || type === "warning") {
      console.log(`[BROWSER CONSOLE ${type.toUpperCase()}]: ${text}`);
    }
  });

  page.on("pageerror", (err) => {
    pageErrors.push(err);
    console.error(`[UNCAUGHT PAGE ERROR]: ${err.message}\nStack: ${err.stack}`);
  });

  page.on("requestfailed", (req) => {
    failedRequests.push({
      url: req.url(),
      failure: req.failure()?.errorText,
      method: req.method(),
    });
    console.error(`[FAILED REQUEST]: ${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  page.on("response", (res) => {
    allRequests.push({
      url: res.url(),
      status: res.status(),
      contentType: res.headers()["content-type"],
    });
    if (res.status() >= 400) {
      console.error(`[HTTP ${res.status()}]: ${res.url()}`);
    }
  });

  try {
    console.log(`Navigating to ${url}...`);
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
    console.log(`Initial page load status: ${response?.status()}`);

    // Wait 1 second
    await page.waitForTimeout(1000);

    // 1. Check Hydration Markers & React Root
    const hydrationInfo = await page.evaluate(() => {
      const htmlClass = document.documentElement.className;
      const buttons = Array.from(document.querySelectorAll("button")).map((b) => b.innerText.trim());
      const h1Text = document.querySelector("h1")?.innerText || "";
      return { htmlClass, buttonCount: buttons.length, buttons: buttons.slice(0, 10), h1Text };
    });

    console.log(`\n--- Initial Page State ---`);
    console.log(`<html> class: "${hydrationInfo.htmlClass}"`);
    console.log(`<h1> text: "${hydrationInfo.h1Text}"`);
    console.log(`Buttons count: ${hydrationInfo.buttonCount}`);

    // 2. Test Theme Toggle
    console.log(`\n--- Test 1: Theme Toggle ---`);
    const themeBtn = page.locator('button[title*="Switch to"]').first();
    const preTheme = await page.evaluate(() => document.documentElement.className);
    await themeBtn.click();
    await page.waitForTimeout(400);
    const postTheme = await page.evaluate(() => document.documentElement.className);
    console.log(`Theme toggled from "${preTheme}" to "${postTheme}": ${preTheme !== postTheme ? "SUCCESS" : "FAILED"}`);

    // 3. Test Persona Switcher
    console.log(`\n--- Test 2: Persona Switcher ---`);
    const personaDropdownBtn = page.locator('button:has-text("Demo Persona:")').first();
    const hasPersonaBtn = await personaDropdownBtn.isVisible();
    console.log(`Demo Persona dropdown button visible: ${hasPersonaBtn}`);

    if (hasPersonaBtn) {
      await personaDropdownBtn.click();
      await page.waitForTimeout(400);
      const studentOption = page.locator('button:has-text("Student (Ananya Sharma")').first();
      const studentOptionVisible = await studentOption.isVisible();
      console.log(`Student option visible in dropdown: ${studentOptionVisible}`);

      if (studentOptionVisible) {
        await studentOption.click();
        await page.waitForTimeout(800);
        const newH1 = await page.evaluate(() => document.querySelector("h1")?.innerText || "");
        console.log(`After selecting Student, <h1> is: "${newH1}"`);
        console.log(`Persona Switch to Student: ${newH1.includes("Ananya") ? "SUCCESS" : "FAILED"}`);
      }
    }

    // 4. Test Sidebar Navigation
    console.log(`\n--- Test 3: Sidebar Navigation ---`);
    const mtssLink = page.locator('button:has-text("OmniLoop MTSS")').first();
    if (await mtssLink.isVisible()) {
      await mtssLink.click();
      await page.waitForTimeout(500);
      const mtssHeading = await page.locator('h2:has-text("OmniLoop MTSS Early-Warning Engine")').isVisible();
      console.log(`Navigated to MTSS Panel: ${mtssHeading ? "SUCCESS" : "FAILED"}`);
    }

    // 5. Test Trilingual Selector
    console.log(`\n--- Test 4: Trilingual Selector ---`);
    const langBtn = page.locator('button:has-text("EN")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(300);
      const hiOption = page.locator('button:has-text("हिन्दी")').first();
      if (await hiOption.isVisible()) {
        await hiOption.click();
        await page.waitForTimeout(500);
        console.log(`Switched to Hindi. Checking notices or headings.`);
      }
    }

    // 6. Test Cmd+K Command Palette
    console.log(`\n--- Test 5: Command Palette ---`);
    const cmdkBtn = page.locator('button:has-text("Cmd+K")').first();
    if (await cmdkBtn.isVisible()) {
      await cmdkBtn.click();
      await page.waitForTimeout(400);
      const searchInput = page.locator('input[placeholder*="Type a command"]').first();
      const inputVisible = await searchInput.isVisible();
      console.log(`Command Palette opened: ${inputVisible ? "SUCCESS" : "FAILED"}`);
      if (inputVisible) {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
      }
    }

  } catch (err) {
    console.error(`Diagnosis script run error: ${err.message}`);
  } finally {
    await browser.close();
  }

  console.log(`\n================ SUMMARY OF DIAGNOSIS ================`);
  console.log(`Console Errors/Warnings: ${consoleMessages.length}`);
  console.log(`Uncaught Page Errors: ${pageErrors.length}`);
  console.log(`Failed Requests: ${failedRequests.length}`);
  console.log(`Total Requests: ${allRequests.length}`);
  console.log(`======================================================\n`);
}

const targetUrl = process.argv[2] || "http://localhost:3001";
runDiagnosis(targetUrl);
