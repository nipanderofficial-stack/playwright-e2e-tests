import { test,expect } from "@playwright/test"

test("Validate the page load with correct title", async ({page}) => {
    
    // 1 Goto Homepage
    await page.goto("https://katalon-demo-cura.herokuapp.com");

    // 2 Assert the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // 3 Assert header Text
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});