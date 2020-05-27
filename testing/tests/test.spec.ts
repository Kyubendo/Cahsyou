import {describe, Suite} from "./mocha-puppeteer";
import * as faker from "faker/locale/uk"
import * as assert from "assert";


describe('', function (this: Suite) {

    const numberFieldS = "#phone-number-field";
    const phoneNumberV = faker.phone.phoneNumber().toString().substr(2);
    const smsFieldS = "#sms-code-field";
    const smsFieldV = "999999";
    const smsFieldWrongV = "000000";

    const passwordS = "#password-field";
    const passwordV = "Password1";
    const savePasswordBtnS = "#save-password-btn";

    const surnameS = "#surname-field";
    const surnameV = "Иванов";
    const nameS = "#name-field";
    const nameV = "Иван";
    const patronymicS = "#patronymic-field";
    const patronymicV = "Иванович";
    const emailS = "#email-field";
    const emailV = "email@gmail.com";
    const innS = "#inn-field";
    const innV = Math.floor((Math.random() * (3732499999 - 1833100001) + 1833100001)).toString();

    const actualRegionSelectS = "#actual-region-select";
    const menuOptionS = "div.Select-option:nth-child";
    const addressS = ".address-select";
    const addressV = "Фрунзенский";

    const actualLocalityTypeSelectS = "#actual-locality-type-select";
    const actualLocalityFieldS = "#actual-locality-field";
    const actualLocalFieldV = "Харьков";

    const actualStreetTypeSelectS = "#actual-street-type-select";
    const actualStreetNameFieldS = "#actual-street-name-field";
    const actualStreetNameFieldV = "Киевская";
    const actualHouseNumberS = "#actual-house-number-field";
    const actualHouseNumberV = "2";
    const actualApartmentFieldS = "#actual-apartment-field";
    const actualApartmentFieldV = "12";

    const actualTermSelectS = "#actual-term-field";
    const coincidesBtnS = ".coincides-button-container >.btn_radio:nth-child(1)";

    const employmentSelectS = "#employment-select";
    const positionSelectS = '[data-name="position"]';
    const activityTypeSelectS = '[data-name="activity_type"]';
    const workTermSelectS = '[data-name="work_term"]';
    const employerNameFieldS = '[data-name="employer_name"]';
    const employerNameFieldV = 'Укртехпром';
    const revenueFieldS = '[data-name="revenue"]';
    const revenueFieldV = '10000';

    const passportBtnContainerS = '[data-name="passport_type"] > button:nth-child';

    const passportNumberFieldS = '[data-name="passport"]';
    const passportNumberFieldV = 'МТ084642';
    const passportIssueFieldS = '[data-name="passport_issue"]';
    const passportIssueFieldV = 'Фрунценским РВ КМУ ГУМВС Украины в Харьковской области';
    const passportDateIssueFieldS = '[data-name="passport_date_issue"]';
    const passportDateIssueFieldV = '10032012';
    const pPassportIdNumberS = '[name="id_card_number"]';

    const nextFirstPageBtnS = '#next-first-page';

    const cardGroupS = ".card__number > div:nth-child";
    const addCardBtnS = '.btn_add_card';

    const confirmCardBtnS = '.form-confirm-card';

    const confirmAmountFieldS = '#confirm-amount-field';
    const confirmAmountFieldV = '99'
    const confirmAmountBtnS = '#confirm-card-btn'
    const nextBtnS = '.btn-next';
    const discountContactBtn = '#discount-contact-btn'

    const discountNameS = '[name="name"]';
    const discountNameV = 'Пётр Петров Петрович';
    const discountPhoneS = '[name="phone"]';
    const discountPhoneV = faker.phone.phoneNumber().toString().substr(2);
    const discountContactTypeS = '[name="type"]';
    const discountContactTypeV = 'Братом';
    const saveContactBtnS = '#save-contact-btn';
    const singBtnS = '#sign-credit-btn';
    const hasErrorS = '.has-error';
    const hasErrorClass = 'has-error';
    const changeCardBtnS = '#change-card-btn'

    const registerUrl = 'http://localhost:3000/register';

    const contactNameFieldS = '#contact-name-field';
    const contactNameFieldV = 'Вася';

    const contactPhoneFieldS = '#contact-phone-field';
    const contactPhoneFieldV = faker.phone.phoneNumber().toString().substr(2);

    const inputDocumentFirstPassportPageS = '#input-document-firstPassportPage';
    const inputDocumentFirstPassportPageP = './documents/firstPage.jpg'
    const inputPhotoWithPassportS = '#input-document-documentPhoto';
    const inputPhotoWithPassportP = './documents/withPassport.jpeg';


    const adminPhoneS = '[name="login"]';
    const adminPhoneV = '380000000000';
    const adminPasswordS = '[name="password"]';
    const adminPasswordV = 'RNDc1f494f89651f5d2';
    const adminLoginBtnS = 'button[type="submit"]';

    const requestsT = "Заявки";
    const newRequestsT = "Нові"
    const showClientBtnS = '.fa-eye';
    const photoWithPassportT = "Фото с документом";
    const confirmBtnT = "На розгляді"
    const confirmBtnInMenuT = "Підтверджено";

    const crossS = '.ril__closeButton';

    const confirmRequestBtnT = "Верифікувати заявку";

    const firstPagePhotoS = "Первая сторона ID-карты";
    const firstPagePhotoS1 = "Первая страница паспорта";



    async function clearField(page: any) {
        await page.keyboard.down('Control');
        await page.keyboard.down('KeyA');
        await page.keyboard.up('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
    }

    const escapeXpathString = (str: any) => {
      const splitedQuotes = str.replace(/'/g, `', "'", '`);
      return `concat('${splitedQuotes}', '')`;
    };

    const clickByText = async (page: any, text: string, selector: string) => {
      const escapedText = escapeXpathString(text);
      const linkHandlers = await page.$x(`//${selector}[contains(text(), ${escapedText})]`);
      if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
      } else {
        throw new Error(`Not found: ${text}`);
      }
    };
    async function typeInField(page: any, selector: string, value: string, click = true, confirmingSelector?: string) {
        await page.waitForSelector(selector);
        await page.focus(selector);
        if (click) await page.click(selector);
        await page.keyboard.type(value);
        if (confirmingSelector) await page.waitForSelector(confirmingSelector);
    }

    async function selectValue(page: any, fieldSelector: string, menuSelector: string, option = 1) {
        await page.waitForSelector(fieldSelector);
        await page.focus(fieldSelector);
        await page.click(fieldSelector);
        const menuOption = menuOptionS + "(" + option + ")";
        await page.waitForSelector(menuOption);
        await page.click(menuOption)
    }

    async function click(page: any, selector: string, confirmingSelector?: string) {
        await page.waitForSelector(selector);
        await page.focus(selector);
        await page.click(selector);
        if (confirmingSelector) await page.waitForSelector(confirmingSelector);
    }

    it('phone number field -- id 1-2', async () =>  {
      await this.page.waitForSelector(numberFieldS);
      await this.page.focus(numberFieldS);
      await this.page.keyboard.type(phoneNumberV, {delay: 120});
      await this.page.waitForSelector(smsFieldS);
    });

    it.skip('sms field wrong code -- id 7 problem', async () => {
      await typeInField(this.page, smsFieldS, smsFieldWrongV, false, hasErrorS);
      await click(this.page, smsFieldS);
      await clearField(this.page);
    })

    it('sms field -- id 5-6', async () => {
      await typeInField(this.page, smsFieldS, smsFieldV, false, passwordS)
    })

    it('password field -- id 9, 12', async () => {
      await typeInField(this.page, passwordS, passwordV);
      await this.page.focus(savePasswordBtnS);
      await this.page.click(savePasswordBtnS);
      await this.page.waitForSelector(surnameS);
    })

    it('personal data block -- id 16', async () => {
      await typeInField(this.page, surnameS, surnameV);
      await typeInField(this.page, nameS, nameV);
      await typeInField(this.page, patronymicS, patronymicV);
      await typeInField(this.page, emailS, emailV);
      await typeInField(this.page, innS, innV);
    })

    it('address block -- id 18, 21, 23', async () => {
      await selectValue(this.page, actualRegionSelectS, menuOptionS, 19);
      await typeInField(this.page, addressS, addressV);

      await selectValue(this.page, actualLocalityTypeSelectS, menuOptionS, 2);
      await typeInField(this.page, actualLocalityFieldS, actualLocalFieldV);
      await selectValue(this.page, actualStreetTypeSelectS, menuOptionS);
      await typeInField(this.page, actualStreetNameFieldS, actualStreetNameFieldV);

      await typeInField(this.page, actualHouseNumberS, actualHouseNumberV);
      await typeInField(this.page, actualApartmentFieldS, actualApartmentFieldV);
      await selectValue(this.page, actualTermSelectS, menuOptionS, 2);
      await click(this.page, coincidesBtnS);
    })

    it('house number field -- id 20 problem', async () => {
      await this.page.$(actualHouseNumberS)
          .then((el) => el!.getProperty("className"))
          .then((cn) => cn.jsonValue())
          .then((classNameString) => (classNameString as string).split(" "))
          .then((x) => assert.strictEqual(x.includes(hasErrorClass),false));
    })

    it('employment select -- id 24-25', async () => {
      await selectValue(this.page, employmentSelectS, menuOptionS);
      await selectValue(this.page, positionSelectS, menuOptionS);
      await selectValue(this.page, activityTypeSelectS, menuOptionS);
      await selectValue(this.page, workTermSelectS, menuOptionS);
      await typeInField(this.page, employerNameFieldS, employerNameFieldV);
      await typeInField(this.page, revenueFieldS, revenueFieldV);
    })

    it.skip('passport change -- id 26 problem', async () =>{
      await click(this.page, passportBtnContainerS+'(2)');
      await typeInField(this.page, pPassportIdNumberS, '1111', false);
      await click(this.page, passportBtnContainerS+'(1)');
    })

    it('passport block -- id 30', async () => {
      await typeInField(this.page, passportNumberFieldS, passportNumberFieldV);
      await typeInField(this.page, passportIssueFieldS, passportIssueFieldV);
      await typeInField(this.page, passportDateIssueFieldS, passportDateIssueFieldV);
    })

    it('contact person -- ', async () => {
      await typeInField(this.page, contactNameFieldS, contactNameFieldV);
      await typeInField(this.page, contactPhoneFieldS, contactPhoneFieldV);
    })

    it('attach files -- ', async () => {
      const passportPhotoInput = await this.page.$(inputDocumentFirstPassportPageS);
      if (passportPhotoInput){
        await passportPhotoInput.uploadFile(inputDocumentFirstPassportPageP);
      }
      const photoWithPassport = await this.page.$(inputPhotoWithPassportS);
      if (photoWithPassport) {
        await photoWithPassport.uploadFile(inputPhotoWithPassportP)
      }
    })

    it('sing up button -- id 31', async () => {
      await click(this.page, nextFirstPageBtnS);
    })





    it('admin login -- ', async () => {
        await this.page.goto('https://bobra.v2.cashyou.ua/', {waitUntil: 'networkidle2'});
        await typeInField(this.page, adminPhoneS, adminPhoneV);
        await typeInField(this.page, adminPasswordS, adminPasswordV);
        await click(this.page, adminLoginBtnS);
        await this.page.waitFor(2000);
        await click(this.page, adminLoginBtnS);
    })

    it('go to requests -- ', async () => {
        await this.page.waitForSelector('.fa');
        await this.page.waitFor(1000);

        await clickByText(this.page, requestsT, 'span');
        await clickByText(this.page, newRequestsT, 'span');
    })

    it('confirm photos', async () => {
        await click(this.page, showClientBtnS);
        await this.page.waitForSelector('.file-box');
        await clickByText(this.page, photoWithPassportT, 'span');
        await this.page.waitFor(1000);
        await clickByText(this.page, confirmBtnT, 'button');
        await clickByText(this.page, confirmBtnInMenuT, 'a');

        await click(this.page, crossS);
        await this.page.waitFor(20000);

        try {
          await clickByText(this.page, firstPagePhotoS, 'span');
        }catch (e) {
          await clickByText(this.page, firstPagePhotoS1, 'span');
        }
        await this.page.waitFor(1000);
        await clickByText(this.page, confirmBtnT, 'button');
        await clickByText(this.page, confirmBtnInMenuT, 'a');
        await click(this.page, crossS);
    })

    it('confirm request', async () => {
      await clickByText(this.page, confirmRequestBtnT, 'button');
      await this.page.waitFor(40000);
    })


    // it('card number page -- id 33', async () => {
    //   for (let i = 1; i < 5; i++){
    //     const cardSection = cardGroupS + "(" + i + ")";
    //     await typeInField(this.page, cardSection, Math.floor(Math.random() * (9999-1111) + 1111).toString());
    //   }
    //   await click(this.page, addCardBtnS, confirmCardBtnS);
    // })
    //
    // it('change card -- id 35 problem', async () => {
    //   await click(this.page, changeCardBtnS, cardGroupS + "(1)")
    //   for (let i = 1; i < 5; i++){
    //     const cardSection = cardGroupS + "(" + i + ")";
    //     await typeInField(this.page, cardSection, Math.floor(Math.random() * (9999-1111) + 1111).toString());
    //   }
    //   await click(this.page, addCardBtnS, confirmCardBtnS);
    // })
    //
    // it('confirm card page -- id 38', async () => {
    //   await typeInField(this.page, confirmAmountFieldS, confirmAmountFieldV);
    //   await click(this.page, confirmAmountBtnS, nextBtnS);
    // })
    //
    // it('next to discount page -- id 40', async () => {
    //   await click(this.page, nextBtnS, discountContactBtn);
    //   await click(this.page, discountContactBtn);
    // })
    //
    // it('contact discount form -- id 43', async () => {
    //   await typeInField(this.page, discountNameS, discountNameV);
    //
    //   await this.page.waitForSelector(discountPhoneS);
    //   await this.page.focus(discountPhoneS);
    //   await this.page.keyboard.type(discountPhoneV, {delay: 120});
    //
    //   await typeInField(this.page, discountContactTypeS, discountContactTypeV);
    //   await click(this.page, saveContactBtnS);
    // })
    //
    // it('sign credit -- id 46', async () => {
    //   await this.page.waitFor(500);
    //   await click(this.page, singBtnS, smsFieldS);
    // })
    //
    // it('wrong sms code -- id 49 problem', async () => {
    //   await typeInField(this.page, smsFieldS, '000000');
    //   for (let i = 0; i < 10; i++) {
    //     try {
    //       await this.page.waitFor(200);
    //       await click(this.page, singBtnS);
    //     } catch(e){}
    //   }
    //   try{await this.page.waitForNavigation({ waitUntil: 'networkidle0' })} catch (e) {}
    //   await assert.strictEqual(this.page.url(), registerUrl)
    // })
});
