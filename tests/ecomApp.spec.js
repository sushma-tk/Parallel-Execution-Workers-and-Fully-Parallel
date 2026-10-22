const {test, expect} = require('@playwright/test');

test("Special ", async ({page})=>
{   
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    await page.goto("/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByText('Employed').check();
    await page.getByLabel('Gender').selectOption("Female");
    await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD);
    await page.getByRole("button", {name:'Submit'}).click();
    //await page.getByText("Success! The Form has been submitted successfully!.").click();
    await page.getByRole("link", {name : 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});