# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UploadDownloadExcelJs.spec.js >> upload and download excel test
- Location: tests\UploadDownloadExcelJs.spec.js:40:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('row').filter({ has: getByText('Mango') }).locator('#cell-4-undefined')
Expected substring: "899"
Received string:    "999"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('row').filter({ has: getByText('Mango') }).locator('#cell-4-undefined')
    14 × locator resolved to <div role="cell" data-column-id="4" id="cell-4-undefined" data-tag="allowRowEvents" class="sc-hLQSwg sc-eDLKkx sc-jTQCzO kyDEvf gfKXFa cJTPDY rdt_TableCell">…</div>
       - unexpected value "999"

```

```yaml
- cell "999"
```

# Test source

```ts
  1  | const exceljs=require('exceljs');
  2  | const {test, expect}=require('@playwright/test');
  3  | const { log } = require('node:console');
  4  | 
  5  | 
  6  | 
  7  | async function writeExcelTest(searchText,replaceText,change,filePath) 
  8  | {
  9  |    
  10 |     const workbook = new exceljs.Workbook();
  11 |     await workbook.xlsx.readFile(filePath);
  12 |     const worksheet = workbook.getWorksheet('Sheet1');
  13 |     const output=await readExcel(worksheet,searchText);
  14 |     const cell=worksheet.getCell(output.rNum,output.cNum+change.columnChange);
  15 |     cell.value=replaceText;
  16 |     await workbook.xlsx.writeFile(filePath);
  17 | };
  18 | 
  19 | 
  20 | async function readExcel(worksheet,searchText)
  21 | {
  22 |          let output={rNum:-1, cNum:-1};
  23 |     worksheet.eachRow((row, rowNum) => {
  24 |         row.eachCell((cell, colNum) => {
  25 |             if(cell.value === searchText)
  26 |             {
  27 |                 output.rNum=rowNum;
  28 |                 output.cNum=colNum;
  29 |                 console.log(rowNum,colNum);
  30 |                 
  31 |             }
  32 |         })
  33 |     })
  34 |     return output;
  35 | 
  36 | }
  37 | 
  38 | 
  39 | 
  40 | test('upload and download excel test',async ({page})=>{
  41 | 
  42 |     const searchText ='Mango';
  43 |     const replaceText ='999';
  44 |      const replaceText1 ='899';
  45 |     const filePath='C:\\Users\\DELL\\Downloads\\download.xlsx';
  46 |     await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
  47 |     const downloadPromise=page.waitForEvent('download');
  48 |     await page.getByRole('button',{name:'Download'}).click();
  49 |     const downloadfile= await downloadPromise; 
  50 |     await downloadfile.saveAs(filePath);
  51 |     await writeExcelTest(searchText, replaceText, {rowChange:0,columnChange:2},filePath);
  52 |     await page.locator("#fileinput").click();
  53 |     await page.locator("#fileinput").setInputFiles('C:\\Users\\DELL\\Downloads\\download.xlsx');
  54 |     const rows=page.locator("div[class*='TableRow']");
  55 | 
  56 |     const textLocator=page.getByText(searchText);
  57 |     const value=await page.getByRole('row').filter({has :textLocator}).locator("#cell-4-undefined").textContent();
  58 |     expect(value===replaceText).toBeTruthy();
> 59 |     await expect(page.getByRole('row').filter({has :textLocator}).locator("#cell-4-undefined")).toContainText(replaceText1);
     |                                                                                                 ^ Error: expect(locator).toContainText(expected) failed
  60 |  
  61 |   // const count=await rows.count(); //dont use this . it doesnt pass
  62 | 
  63 |     for(let i=0; i<await rows.count(); i++)
  64 |     {
  65 |     
  66 |         if (await rows.nth(i).locator("#cell-2-undefined div").textContent() === searchText)
  67 |         {
  68 |         
  69 | 
  70 |             await expect(rows.nth(i).locator("#cell-4-undefined div")).toContainText(replaceText);
  71 |           break;
  72 |         }
  73 |     }
  74 |    
  75 | 
  76 | 
  77 |  
  78 | })
```