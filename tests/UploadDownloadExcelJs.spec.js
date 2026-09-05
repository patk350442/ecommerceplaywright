const exceljs=require('exceljs');
const {test, expect}=require('@playwright/test');
const { log } = require('node:console');



async function writeExcelTest(searchText,replaceText,change,filePath) 
{
   
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output=await readExcel(worksheet,searchText);
    const cell=worksheet.getCell(output.rNum,output.cNum+change.columnChange);
    cell.value=replaceText;
    await workbook.xlsx.writeFile(filePath);
};


async function readExcel(worksheet,searchText)
{
         let output={rNum:-1, cNum:-1};
    worksheet.eachRow((row, rowNum) => {
        row.eachCell((cell, colNum) => {
            if(cell.value === searchText)
            {
                output.rNum=rowNum;
                output.cNum=colNum;
                console.log(rowNum,colNum);
                
            }
        })
    })
    return output;

}



test('upload and download excel test',async ({page})=>{

    const searchText ='Mango';
    const replaceText ='999';
     const replaceText1 ='899';
    const filePath='C:\\Users\\DELL\\Downloads\\download.xlsx';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    const downloadfile= await downloadPromise; 
    await downloadfile.saveAs(filePath);
    await writeExcelTest(searchText, replaceText, {rowChange:0,columnChange:2},filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles('C:\\Users\\DELL\\Downloads\\download.xlsx');
    const rows=page.locator("div[class*='TableRow']");

    const textLocator=page.getByText(searchText);
    const value=await page.getByRole('row').filter({has :textLocator}).locator("#cell-4-undefined").textContent();
    expect(value===replaceText).toBeTruthy();
    await expect(page.getByRole('row').filter({has :textLocator}).locator("#cell-4-undefined")).toContainText(replaceText1);
 
  // const count=await rows.count(); //dont use this . it doesnt pass

    for(let i=0; i<await rows.count(); i++)
    {
    
        if (await rows.nth(i).locator("#cell-2-undefined div").textContent() === searchText)
        {
        

            await expect(rows.nth(i).locator("#cell-4-undefined div")).toContainText(replaceText);
          break;
        }
    }
   


 
})