import BasePage from "./base.page";
import { expect, type Page } from "@playwright/test";
import { log } from "../helpers/logger";

export default class HomePage extends BasePage {
  //constructor
  constructor(page: Page) {
    super(page);
  }

  //Elements
  get userNameInputBox() {
    return this.page.getByRole("textbox", { name: "Email:" });
  }
  get passwordInputBox() {
    return this.page.getByRole("textbox", { name: "Password:" });
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Log in" });
  }

  //Page Actions
  async loginToNopECommerceApp(
    url: string,
    userName: string,
    password: string,
  ) {
    await log("info", "Login to ${url}");
    await this.navigateTo(url);
    await this.typeInto(this.userNameInputBox, userName);
    await this.typeInto(this.passwordInputBox, password);
    await this.click(this.loginBtn);

    //Assert the URL on Homepage
    await expect(this.page).toHaveURL("${url}/admin/");

    await log("info", "Homepage is successfully launched");
  }
}
