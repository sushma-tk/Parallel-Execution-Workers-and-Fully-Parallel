// End to end test
// open link https://rahulshettyacademy.com/upload-download-test/ and downlaod excel
// update content in the excel 
// upload back to the site and check if updated content shows up on the page.

const {test, expect} = require('@playwright/test');
const ExcelJS = require('exceljs');

// ********* changing Mango price to 350 ********
async function writeExcelTest(searchText, replaceText,change,  filePath) {
    const workbook = new ExcelJS.Workbook();
     await workbook.xlsx.readFile(filePath); 
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;  
    await workbook.xlsx.writeFile(filePath);  //saving the file

}

async function readExcel(worksheet, searchText) {
        let output = {row:-1,column:-1};
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if(cell.value === searchText) {
                    output.row = rowNumber;      // rowNumber and colNumber are local to this mehtod. 
                    output.column = colNumber;   // so we assigned to output and can use it outside of method. 
                }
            });
    })
    return output;
}
    


test("upalod-download test validation", async ({page})=>{
    const textSearch = "Mango";
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent("download");   // we are telling to event for download event to complete
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcelTest(textSearch, updateValue,{rowChange:0, colChange:2}, "/Users/sushma/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("/Users/sushma/Downloads/download.xlsx"); // make sure our element on page as component type = file

    const textlocator = await page.getByText(textSearch);
    const desiredRow = await page.locator('row').filter({has:textlocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
    
});
