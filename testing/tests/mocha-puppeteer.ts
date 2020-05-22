import * as puppeteer from "puppeteer";
import * as mocha from "mocha";
import {editTrace} from './editTrace'


export interface Suite extends mocha.Suite {
    page: puppeteer.Page;
    browser: puppeteer.Browser;
    id: string;
}
export function describe(title: string, fn: (this: Suite) => void): mocha.Suite {
    return mocha.describe(title, function (this: Suite) {
        let testNumber=0;
        before(async () => {
            this.browser = await puppeteer.launch({
                slowMo: 10,
                args: [`--window-size=1366,980`,
                ],
                headless: process.env.OPEN !== "1",
            });
            this.page = (await this.browser.pages())[0] || await this.browser.newPage();
            await this.page.setViewport({height: 980, width: 1366});
            await this.page.goto('http://localhost:3000/', {waitUntil: 'networkidle2'});
        });
        beforeEach(async () =>{
            if (process.env.RECORD=="1") {
                await this.page.tracing.start({path:`./traces/trace${testNumber}.json`, screenshots:true});
            }
        })
        afterEach(async () => {
            if (process.env.RECORD=="1") {
                await this.page.tracing.stop();
                await editTrace(testNumber);
                testNumber++;
            }
        })
        after(async () => {
            await this.browser.close();
        });
        fn.call(this);
    } as any)
}
