import { test, expect } from "@playwright/test";

test("Appointment test", async ({ page }) => {
  //Launch
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("h1")).toHaveText("CURA Healthcare Service");

  //click on the Appointment button and login
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await expect(page.getByText("Please login to make")).toBeVisible();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  //validate the default optioon in the dropdown
  await expect(page.getByLabel("Facility")).toHaveValue(
    "Tokyo CURA Healthcare Center",
  );

  // select the option from dropdown using selectOption and other additional options
  await page
    .getByLabel("Facility")
    .selectOption("Seoul CURA Healthcare Center");
  await page
    .getByLabel("Facility")
    .selectOption({ label: "Hongkong CURA Healthcare Center" });
  await page.getByLabel("Facility").selectOption({ index: 2 });
  await expect(page.getByLabel("Facility")).toHaveValue(
    "Seoul CURA Healthcare Center",
  );

  //Count of options
  let dropDownElements = page.getByLabel("Facility").locator("option");
  let optCount = await page.getByLabel("Facility").locator("option").count();
  await expect(dropDownElements).toHaveCount(3); //validate the count
  console.log(`Count: ${optCount}`);

  let dropDownEle = await page.getByLabel("Facility").all();
  let listOfOptions = [];

  for (let ele of dropDownEle) {
    let eleText = await ele.textContent();
    if (eleText) {
      listOfOptions.push(eleText);
    }
  }

  console.log(`Drop down elements are ${listOfOptions}`);
});
