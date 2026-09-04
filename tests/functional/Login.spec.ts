import { test, expect } from "@playwright/test";

test.describe("Test Login", () => {
  test.beforeEach("Go to Login page", async({page}, testInfo) => {
      // launch page and validate the title

      const envConfig = testInfo.project.use as any;

    await page.goto(envConfig.appURL);
    await expect(page).toHaveTitle("CURA Healthcare Service");

    //Login to make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();

  })
  test("test1", async ({ page }) => {
  
    await page.getByLabel("Username").fill(process.env.TEST_USERNAME);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    //Enter the details on Appointment page
    await expect(page.locator("//h2")).toHaveText("Make Appointment");
    
  });

  test("Login failed with invalid credentials", async ({ page }) => {
  
    await page.getByLabel("Username").fill("John Wick");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    // Assert the Login failed error
    await expect(page.getByText("Login failed! Please ensure"));
  });
});
