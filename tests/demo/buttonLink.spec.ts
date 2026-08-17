import { test, expect } from '@playwright/test'

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