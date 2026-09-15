const {test, expect} = require('@playwright/test');

test("Special ", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByText('Employed').check();
    await page.getByLabel('Gender').selectOption("Female");
    await page.getByPlaceholder('Password').fill("Sushma@123");
    await page.getByRole("button", {name:'Submit'}).click();
    //await page.getByText("Success! The Form has been submitted successfully!.").click();
    await page.getByRole("link", {name : 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

});

// test expect timeout example 
// test("Slow Expect test ", async ({page})=>
// {
//     const slowExpect = expect.configure({timeout:9000});
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByRole("link", {name : 'Shop'}).click();
//     await slowExpect(page.locator('h1.my-4')).toHaveText("Shop");

// });


// specific test timeout setup example
// test("specific test timeout setup ", async ({page})=>
// {
//     test.setTimeout(60000);
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByLabel('Check me out if you Love IceCreams!').click();
//     //
//     //

// });


// steptest timeout setup example
// test("specific test timeout setup ", async ({page})=>
// {
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByRole("link", {name : 'Shop'}).click({timeout:11000});
    
// });


// test level action timeout setup example
// test("specific test action timeout setup ", async ({page})=>
// {
//     page.setDefaultTimeout(6000);
//     await page.goto("https://rahulshettyacademy.com/angularpractice/");
//     await page.getByRole("link", {name : 'Shop'}).click();
    
// });
