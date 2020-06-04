import * as puppeteer from "puppeteer";
import * as mocha from "mocha";
import {clearInputs, createFullVideo, editTrace} from './editTrace'


export interface Suite extends mocha.Suite {
    page: puppeteer.Page;
    browser: puppeteer.Browser;
}

export function describe(title: string, fn: (this: Suite) => void): mocha.Suite {
    return mocha.describe(title, function (this: Suite) {
        let testNumber=0;
        before(async () => {
            this.browser = await puppeteer.launch({
                slowMo: 10,
                args: [`--window-size=1366,768`,
                    '--disable-features=site-per-process'
                ],
                headless: process.env.OPEN !== "1",
            });
            this.page = (await this.browser.pages())[0] || await this.browser.newPage();
            await this.page.setViewport({height: 768, width: 1366});
            await this.page.goto('http://localhost:3000/', {waitUntil: 'networkidle2'});
            await clearInputs();
        });
        beforeEach(async () =>{
            if ((process.env.RECORD=="1")) {
                await this.page.tracing.start({path:`./traces/trace${testNumber}.json`, screenshots:true});
            }
        })
        afterEach(async () => {
            if ((process.env.RECORD=="1")) {
                await this.page.tracing.stop();
                await editTrace(testNumber);
            }
        })
        afterEach( async function () {
            if (process.env.RECORD=="1") {
                if (this.currentTest!.state === 'failed') {
                    console.log('Problem shown in video' + testNumber);
                }
                testNumber++;
            }
        })

        after(async () => {
            await this.browser.close();
            if (process.env.RECORD=="1") {
                await setTimeout(createFullVideo, 3000);
            }
        });
        fn.call(this);
    } as any)
}
