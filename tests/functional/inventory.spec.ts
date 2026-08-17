import { test, expect } from "@playwright/test";

test.describe("Inventory feature", () => {
  test.beforeEach("Login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    //Assertion
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("Should confirm the prices are non-zero", async ({ page }) => {
    //Get the list of products
    let products = page.locator('[data-test="inventory-item"]');
    await expect(products).toHaveCount(6);
    let total = await products.count();

    let priceArr = [];

    for (let i = 0; i < total; i++) {
      let eleNode = products.nth(i);
      let itemname = await eleNode
        .locator('[data-test="inventory-item-name"]')
        .innerText();
      let itemprice = await eleNode
        .locator('[data-test="inventory-item-price"]')
        .innerText();

      console.log(`Product: ${itemname} and item Price: ${itemprice}`);
      priceArr.push(itemprice);
    }

    console.log(`Original price Array: ${priceArr}`);

    //Remove the $ sign from price Arr : [$29.99,$9.99,$15.99,$49.99,$7.99,$15.99]
    // Replace $ with ""
    // Compare the price should be > 0

    //Replace the $ sign with "" using map function and save the same in a new array
    let updatePriceArr = priceArr.map((item) =>
      parseFloat(item.replace("$", "")),
    );
    console.log(`Updated Price Array: ${updatePriceArr}`);

    //Create an Array for the invalid entries where price is <=0
    let invalidPriceitem = updatePriceArr.filter((item) => item <= 0);

    if (invalidPriceitem.length > 0) {
      console.log("ERROR: Invalid price detected!!");
    } else {
      console.log("INFO: Valid price entries present !!!");
    }

    //Alternatively if the if is not to be included then use the expect
    expect(invalidPriceitem).toHaveLength(0);
  });
});
