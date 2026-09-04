import { expect, test } from "@playwright/test";

test("navigates through multiple windows", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/");
  await page.getByRole("link", { name: "Multiple Windows" }).click();

  const firstWindowPromise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Click Here" }).click();
  const firstWindow = await firstWindowPromise;

  await firstWindow.waitForLoadState();
  await expect(firstWindow.getByRole("heading", { name: "New Window" })).toBeVisible();

  const nextWindowPromise = firstWindow.waitForEvent("popup");
  await firstWindow.getByRole("link", { name: "Elemental Selenium" }).click();
  const nextWindow = await nextWindowPromise;

  await nextWindow.waitForLoadState();
  await expect(nextWindow).toHaveTitle(/Elemental Selenium/);

  await firstWindow.close();
  await nextWindow.close();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com/windows");
});