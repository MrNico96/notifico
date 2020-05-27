const cron = require('node-cron');
const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('../config');

async function notificoBot(){
    return new Promise(async (resolve, reject) => {
    try{
        let url = config.searchUrl;
        // For Mac & Windows
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        try{
            await page.goto(url, {waitUntil: 'networkidle2'});
        }catch{console.log("Error Wait")}

        await page.evaluate(() => document.location["origin"]);
        await page.waitForSelector('ul#resultListItems');
        
        await autoScroll(page);
        //Get all URL Links in Result-List class
        let resultList = await page.evaluate(
            () => [...document.querySelectorAll('.result-list-entry__brand-title-container')].map(elem => elem.href)
          );
        
        //check if new Entries is in ResultList
        for(var i = 0; i < resultList.length; i++){
            if(add(resultList[i]) === false){
               await sendToTelegram(resultList[i]);
            }
        }
        await browser.close();
        console.log("end bot");
        return resolve(resultList);
    } catch (e) {
      return reject(e);
    }
    });
  }

//Scroll on Site
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 500;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
}
//Check if Url in JSON and add them
function add(url) {
    
    let rawdata = fs.readFileSync('content/resultList.json');
    let arr = JSON.parse(rawdata);
    const found = arr.some(el => el === url);
    if (!found){ 
        arr.push(url);
        let data = JSON.stringify(arr);
        fs.writeFileSync('content/resultList.json', data, (err) => {
            if (err) throw err;
        });
    }
    return found;
}

async function sendToTelegram(listingUrl){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
    const url = 'https://nico-judge.de/projekte/notifico/index.php?telegramId=' + config.telegramId + '&url=' + listingUrl;
    await page.goto(url, {waitUntil: 'networkidle2'});
    console.log("Send to Telegram " + listingUrl);
    await browser.close();
}

//Define Cronjob
// config.scanFrequency
cron.schedule('*/'+config.scanFrequency+' * * * *', () => {
    console.log("execute " + new Date().toString());
    notificoBot();
  });