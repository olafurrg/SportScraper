const puppeteer = require('puppeteer');

async function scrapeSite(url){
    const browser = await puppeteer.launch({headless: true});
    const infoList = [];
    try{
        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForXPath('/html/body/div/div/div/div[3]/div[1]/div/div[2]/img');
        await page.click('#root > div > div > div:nth-child(3) > div:nth-child(1) > button');
        
        const outerDiv = await page.$$('.sc-knSEWW');

        
        let increment = 2;

        //looping through every inner div to get the necessery info
        for (const innerDiv of outerDiv){
            //Get photo link
            const [el] = await page.$x(`/html/body/div/div/div/div[3]/div[1]/div/div[${increment}]/img`);
            const src = await el.getProperty('src');
            const oponentPhoto = await src.jsonValue();
            //Get oponent name
            const [el2] = await page.$x(`//*[@id="root"]/div/div/div[3]/div[1]/div/div[${increment}]/div/div[1]/span[1]`);
            const txt = await el2.getProperty('textContent');
            const oponent = await txt.jsonValue();
            //Get Time
            const [el3] = await page.$x(`//*[@id="root"]/div/div/div[3]/div[1]/div/div[${increment}]/div/div[2]/span[1]`);
            const txt2 = await el3.getProperty('textContent');
            const time = await txt2.jsonValue();
            //Get day
            const [el4] = await page.$x(`//*[@id="root"]/div/div/div[3]/div[1]/div/div[${increment}]/div/div[2]/span[2]`);
            const txt3 = await el4.getProperty('textContent');
            const day = await txt3.jsonValue();
            //Get home or away
            const [el5] = await page.$x(`//*[@id="root"]/div/div/div[3]/div[1]/div/div[${increment}]/div/div[1]/span[2]/span[1]`);
            const txt4 = await el5.getProperty('textContent');
            const where = await txt4.jsonValue();

            increment++;
            //console.log({oponentPhoto, oponent, time, day, where});
            infoList.push({oponentPhoto, oponent, time, day, where}); 
        }
    } catch(err){
        console.error(err.message);
    } finally {
        browser.close();
    }
    
    return infoList;
    
}


async function gatherInfo(){
    let fylkirKvKPlan = await scrapeSite('https://urslit.net/teams/k110?gender=kvk');
    console.log(fylkirKvKPlan.length);
    let fylkirKKPlan = await scrapeSite('https://urslit.net/teams/k110?gender=kk');
    console.log(fylkirKKPlan[0]);
}


gatherInfo();


