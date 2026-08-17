import { test, expect } from "@playwright/test";

test.describe("Test Login", () => {
  test.beforeEach("Go to Login page", async({page}) => {
      // launch page and validate the title
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");

    //Login to make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();

  })
  test("test1", async ({ page }) => {
  
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //Enter the details on Appointment page
    await expect(page.locator("//h2")).toHaveText("Make Appointment");
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page.getByRole("radio", { name: "Medicare" }).check();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "17" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("Test Appointment Booking");
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //Validate the appoint confirmation page
    await expect(page.locator("h2")).toHaveText("Appointment Confirmation");
    await page.getByRole("link", { name: "Go to Homepage" }).click();

    //To validate the Homepage
    await expect(page.locator("//h3")).toHaveText("We Care About Your Health");
  });

  test("Login failed with invalid credentials", async ({ page }) => {
  
    await page.getByLabel("Username").fill("John Wick");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert the Login failed error
    await expect(page.getByText("Login failed! Please ensure"));
  });
});
