// const puppeteer = require("puppeteer");

// (async () => {
//   try {
//     const browser = await puppeteer.launch({
//       ignoreDefaultArgs: ["--disable-extensions"],
//     });
//     const page = await browser.newPage();
//     await page.goto("https://example.com");
//     await page.screenshot({ path: "example.png" });

//     await browser.close();
//   } catch (e) {
//     console.log(e);
//     throw "error";
//   }
// })();

// const puppeteer = require("puppeteer");

// async function main() {
//   const browser = await puppeteer.launch({
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//   const page = await browser.newPage();
//   await page.goto("https://example.com");
//   await page.screenshot({
//     path: "example.png",
//   });
//   await browser.close();
// }

// // Start the script
// main();



const puppeteer = require('puppeteer');

async function main(i, pagingSize) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto("https://search.shopping.naver.com/search/all?frm=NVSHATC&origQuery=%EB%A7%88%EC%8A%A4%ED%81%AC&pagingIndex="+i+"&pagingSize="+pagingSize+"&productSet=total&query=%EB%A7%88%EC%8A%A4%ED%81%AC&sort=rel&timestamp=&viewType=list");

    let nextData = await page.$eval("#__NEXT_DATA__", function (el) {
        return el.innerText;
    });

    const list = JSON.parse(nextData).props.pageProps.initialState.products.list;
    console.log(list);
    // return list;

    await browser.close();
}

const pagingSize = 40;
const totalSearchPage = 10;

for(let i = 1; i < (totalSearchPage + 1); i++) {

    main(i, pagingSize);
    
}