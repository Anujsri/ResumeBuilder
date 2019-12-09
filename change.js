var puppeteer = require('puppeteer');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');

const compile = async function(templateName, data) {
    const filePath = path.join(process.cwd(), 'views', `${templateName}.html`);
    const html = await fs.readFile(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

hbs.registerHelper('dateFormat', (value, format) => {
    return moment(value).format(format);
})

(async function() {
    try {

    } catch (e) {
        console.log(e);
    }
})();

var htmlToPdf = async function() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const content = await compile('profile', '')

    await page.setContent('<h1>Hello World</h1>');
    await page.emulateMedia('screen');
    await page.pdf({
        path: 'resume.pdf',
        format: 'A4',
        printBackground: true
    });

    await browser.close();
    process.exit();
}