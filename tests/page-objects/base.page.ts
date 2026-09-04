import { expect, type Locator, type Page } from "@playwright/test";
import { log } from "../helpers/logger";

export default class BasePage{
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    //All resuaable actions
    async navigateTo(path:string){
        await log("info",`Navigate to path: ${path}`);
        await this.page.goto(path);
    }

    async click(element: Locator){
        try{
            await expect(element).toBeVisible({timeout:10_000});  //custom Timeout: Default timeout: 5 secs
            await element.click();
        } catch(error){
            await log("error",`Failed to click element: ${element.toString()}, error: ${error}`);
            throw error;
        }
    }

    async typeInto(ele: Locator, text: string){
        try{
            await expect(ele).toBeVisible({timeout:10_000});  //custom Timeout: Default timeout: 5 secs
            await ele.fill(text);
        } catch(error){
            await log("error",`Failed to click element: ${ele.toString()}, error: ${error}`);
            throw error;
        }

    }
}