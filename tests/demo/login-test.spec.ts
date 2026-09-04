import { expect, test } from "@playwright/test";

test("books an appointment", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();

  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Make Appointment" })).toBeVisible();

  // 03-09-2026: select September 3 from CURA's datepicker.
  await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
  await page.locator("td.day:not(.new):not(.old)").filter({ hasText: /^3$/ }).click();
  await page.getByRole("textbox", { name: "Comment" }).fill("Test Appointment Booking");
  await page.getByRole("button", { name: "Book Appointment" }).click();

  await expect(page.getByText("Appointment Confirmation", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Go to Homepage" }).click();
});
