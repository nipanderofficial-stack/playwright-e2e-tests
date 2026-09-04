import {test,expect,devices} from "@playwright/test"

test("Test devices",()=>{
    console.log(`Devices supported by Playwright: ${Object.keys(devices)}`);
});