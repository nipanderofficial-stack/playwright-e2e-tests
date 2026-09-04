import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger';

test('Appointment test', async({page}) => {

    //Launch
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    //Validate the page
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

    //click on the Appointmentbutton
    // Click function
    //await page.getByRole('link',{'name' : 'Make Appointment'}).click();
            
    // Press function
    //await page.getByRole('link',{'name' : 'Make Appointment'}).press('Enter');

    // Double Click
    await page.getByRole('link',{'name' : 'Make Appointment'}).dblclick();

    // Right Click
    await page.getByRole('link',{'name' : 'Make Appointment'}).click({button : 'right'});

    // Hover
    await page.getByRole('link',{'name' : 'Make Appointment'}).hover();

    // Timeout for slow
    await page.getByRole('link',{'name' : 'Make Appointment'}).click({timeout : 30_000});


});

test.only("Click on Make Appointment", async({page}) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    let element = page.getByRole('link',{'name' : 'Make-Appointment'});

    try{
                await expect(element).toBeVisible({timeout:10_000});  //custom Timeout: Default timeout: 5 secs
                await element.click();
        } catch(error){
                await log("error",`Failed to click element: ${element}, error: ${error}`);
                throw error;
        }
});