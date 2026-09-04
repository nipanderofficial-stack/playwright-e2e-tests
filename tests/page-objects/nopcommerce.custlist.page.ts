import BasePage from "./base.page";
import { expect, type Page } from "@playwright/test";
import { log } from "../helpers/logger";

export default class CustListPage extends BasePage {
  //constructor
  constructor(page: Page) {
    super(page);
  }

  //Elements
  get firstNameInputBox() {
    return this.page.getByRole("textbox", { name: "First name" });
  }
  get lastNameInputBox() {
    return this.page.getByRole("textbox", { name: "Last name" });
  }
  get searchBtn() {
    return this.page.getByRole("button", { name: "Search" });
  }
  get noDataAvailableCell() {
    return this.page.locator("{id=search-customers]");
  }

  //Page Actions
  async goToCustomerListPage(custListPage: String) {
    this.navigateTo(custListPage);
  }

  async searchAndConfirmUser(firstname: String, lastname: String) {
    log("info", `Searching for user: ${firstname} ${lastname}......!!`);
    await this.typeInto(this.firstNameInputBox, firstname);
    await this.typeInto(this.lastNameInputBox, lastname);
    await this.click(this.searchBtn);

    // Wait for button click
    await this.page.waitForTimeout(2_000); // wait for 2 seconds
    const customerNotFound = await this.noDataAvailableCell.isVisible();
    return customerNotFound;
  }
}

/**
 * https://admin-demo.nopcommerce.com/Admin/Customer/List
 * await page.getByRole("textbox", { name: "First name" }).fill("John");
 * await page.getByRole("textbox", { name: "Last name" }).fill("Dalton");
 * await page.getByRole("button", { name: "Search" }).click();
 * await page.locator("{id=search-customers]").click();
 *
 */
