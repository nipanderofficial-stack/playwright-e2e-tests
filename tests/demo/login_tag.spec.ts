import { test, expect } from "@playwright/test";
import constants from "../../data/contants.json";

test.describe(
  "Appointment Booking",
  {
    annotation: { type: "Story", description: "JIRA-1234 make Appointment" },
    tag: "@Regression",
  },
  () => {
    test.beforeEach("Login", async ({ page }) => {
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await page.getByRole("link", { name: "Make Appointment" }).click();
    });

    test(
      "Should be able to navigate to Appointment page with valid credentials",
      { tag: "@Smoke" },
      async ({ page }) => {
        await page.getByLabel("username").fill("John Doe");
        await page.getByLabel("password").fill("ThisIsNotAPassword");
        await page.locator("#btn-login").click();

        await expect(page.locator("//h2")).toHaveText("Make Appointment");
        await expect(page.getByLabel("Facility")).toHaveValue(
          "Tokyo CURA Healthcare Center",
        );
      },
    );
    test("Should throw error with invalid credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("John Wick");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.locator("#btn-login").click();

      // Assert the Login failed error
      await expect(page.getByText("Login failed! Please ensure"));
    });   
  });

   test.only("Validate the contants in JSON file", async ({ page }) => {
      console.log(`-----Contant data is : ${JSON.stringify(constants.STATUS)}`);
      console.log(
        `-----Status code for Success : ${JSON.stringify(constants.STATUS.success)}`,
      );
      console.log(
        `-----Status code for Validation error : ${JSON.stringify(constants.STATUS.ValidationError)}`,
      );
    });
