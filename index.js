const puppeteer = require('puppeteer');

async function scrapeSite(url){
    const browser = await puppeteer.launch({headless: false});
    try{
        const page = await browser.newPage();
        await page.goto(url);

        await page.waitForXPath('/html/body/div/div/div/div[3]/div[1]/div/div[2]/img');
        await page.click('#root > div > div > div:nth-child(3) > div:nth-child(1) > button');
        
        const outerDiv = await page.$$('.sc-knSEWW');
        console.log(outerDiv.length);
        let increment = 1;
        for (const innerDiv of outerDiv){
            
            /*
            const name = await innerDiv.$eval('span', (span) => {
                return span.innerText
            });
            const photo = await innerDiv.$eval('img', (img) => {
                return img.src
            });
            console.log(name, photo);
            */

            //Get photo link
            const [el] = await page.$x(`/html/body/div/div/div/div[${increment}]/div[1]/div/div[2]/img`);
            const src = await el.getProperty('src');
            const oponentPhoto = await src.jsonValue();
            //Get oponent name
            const [el2] = await page.$x(`//*[@id="root"]/div/div/div[${increment}]/div[1]/div/div[2]/div/div[1]/span[1]`);
            const txt = await el2.getProperty('textContent');
            const oponent = await txt.jsonValue();
            //Get Time
            const [el3] = await page.$x(`//*[@id="root"]/div/div/div[${increment}]/div[1]/div/div[2]/div/div[2]/span[1]`);
            const txt2 = await el3.getProperty('textContent');
            const time = await txt2.jsonValue();
            //Get day
            const [el4] = await page.$x(`//*[@id="root"]/div/div/div[${increment}]/div[1]/div/div[2]/div/div[2]/span[2]`);
            const txt3 = await el4.getProperty('textContent');
            const day = await txt3.jsonValue();

            increment++;


        }

        
        
        
        /*
        //Get photo link
        const [el] = await page.$x('/html/body/div/div/div/div[3]/div[1]/div/div[2]/img');
        const src = await el.getProperty('src');
        const oponentPhoto = await src.jsonValue();
        //Get oponent name
        const [el2] = await page.$x('//*[@id="root"]/div/div/div[3]/div[1]/div/div[2]/div/div[1]/span[1]');
        const txt = await el2.getProperty('textContent');
        const oponent = await txt.jsonValue();
        //Get Time
        const [el3] = await page.$x('//*[@id="root"]/div/div/div[3]/div[1]/div/div[2]/div/div[2]/span[1]');
        const txt2 = await el3.getProperty('textContent');
        const time = await txt2.jsonValue();
        //Get day
        const [el4] = await page.$x('//*[@id="root"]/div/div/div[3]/div[1]/div/div[2]/div/div[2]/span[2]');
        const txt3 = await el4.getProperty('textContent');
        const day = await txt3.jsonValue();

        console.log({oponentPhoto, oponent, time, day}); 
        return { oponentPhoto, oponent, time, day }
        */
    } catch(err){
        console.error(err.message);
    } finally {
        browser.close();
    }
    
    
    
}

scrapeSite('https://urslit.net/teams/k110?gender=kvk');