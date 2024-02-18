import puppeteer from 'puppeteer';

const main = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1080,
            height: 1024
        }
    });

    const page = await browser.newPage();
    await page.goto('https://www.bremont.com/');

    const title = await page.title();
    console.log(`Title: ${title}`);

    await page.type('#Search', 'watch');
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    const data = {};
    for (let i = 1; i <= 10; i++) {
        const imageUrlSelector = `#kuLandingProductsListUl > li:nth-child(${i}) > a > div.prd-Card_ImageContainer > div.prd-Card_Image > div > img`;
        const titleSelector = `#kuLandingProductsListUl > li:nth-child(${i}) > a > div.prd-Card_Content > h3`;
        const disSelector = `#kuLandingProductsListUl > li:nth-child(${i}) > a > div.prd-Card_Content > ul > li`;

        const imageUrlElement = await page.$(imageUrlSelector);
        const titleElement = await page.$(titleSelector);
        const disElement = await page.$(disSelector);

        if (imageUrlElement && titleElement && disElement) {
            const imageUrl = await page.$eval(imageUrlSelector, img => img.src);
            const title = await page.$eval(titleSelector, h3 => h3.innerText);
            const disValue = await page.$eval(disSelector, li => li.innerText);

            data[`product${i}`] = {
                imageUrl,
                title,
                disValue,
            };
        } else {
            console.error(`Error extracting data for element ${i}: Element not found`);
        }
    }

    console.log(data);

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(data, null, 2);
    console.log(jsonString);

    await browser.close();
};

main();
