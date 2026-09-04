import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import HomePage from "../page-objects/nopcommerce.home.page";
import CustListPage from "../page-objects/nopcommerce.custlist.page";

test.describe("NopCommerce E2E Tests", () => {
    
  test("E2E_TC001: Search the external customer in portal", async ({
    page,request
  }, testInfo) => {
    //Env config
    const envConfig = testInfo.project.use as any;

    log("info", `Making a GET call using ${envConfig.apiURL}`);

    const response = await request.get(`${envConfig.apiURL}users?page=2`, {
        headers: {
            "x-api-key": "reqres-free-v1",
        }
    });
    expect(res.status()).toBe(200);
    await log("info", `GET call is successfull with ${res.status()}`);

    //Step-1:Get the list of users
    const usersData = await res.json();
    log("info", `List of users: ${JSON.stringify(usersData)}`);


    //Create a page object
    const homepage = new HomePage(page);

    //Step-2: Login to NopCommerce Web App
    await homepage.loginToNopECommerceApp(
      envConfig.nopCommerceWeb,
      process.env.NopCommerce_USERNAME,
      process.env.NopCommerce_PASSWORD
      
    );

    //Step-3: Customer search
    const USER_DATA = usersData.data;
    const custlist = new CustListPage(page);
    await custlist.gotoCustomerListPage(`${envConfig.nopCommerceWeb}/Admin/CustomerList`);

    //Step-4: Iterate over the list of users
    for (const user of USER_DATA) {
        let customerNotFoundStatus = await custlist.searchAndConfirmUser(user.first_name, user.last_name);

        if (customerNotFoundStatus) {
            log("info", `Customer ${user.first_name} ${user.last_name} not found in the portal`);
        } else {
            log("info", `Customer ${user.first_name} ${user.last_name} found in the portal`);
        }
    }
  });
});
