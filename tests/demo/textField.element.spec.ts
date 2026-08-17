import { test, expect } from '@playwright/test'

test('Appointment test', async({page}) => {

    //Launch
    await page.goto('https://katalon-demo-cura.herokuapp.com/');    
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

    //click on the Appointment button
    await page.getByRole('link',{'name' : 'Make Appointment'}).click();
    await expect(page.getByText('Please login to make')).toBeVisible();
            
    //actions
    // 1. Clear/click before filling in textbox
    await page.getByLabel('Username').fill('John Wick',{ timeout : 3000});
    await page.getByLabel('username').clear();

    // 2. Fill
    //await page.getByLabel('Username').fill('John Doe');

    // 3. PressSequentially (Slow typing)
    await page.getByLabel('username').pressSequentially('John Doe',{ delay : 300 });


});