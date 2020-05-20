import * as assert from 'assert'
import {describe, Suite} from "./mocha-puppeteer";
import * as faker from "faker/locale/uk"


describe('', function(this: Suite)  {

  const numberFieldS = "#phone-number-field";
  const phoneNumberS = faker.phone.phoneNumber();
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

  const passportBtnContainerS ='[data-name="passport_type"] > button:nth-child';

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
  const discountPhoneV = faker.phone.phoneNumber();
  const discountContactTypeS = '[name="type"]';
  const discountContactTypeV = 'Братом';
  const saveContactBtnS = '#save-contact-btn';
  const singBtnS = '#sign-credit-btn';
  const hasErrorS = '.has-error';
  const hasErrorClass = 'has-error';
  const changeCardBtnS = '#change-card-btn'

  async function clearField(page: any){
    await page.keyboard.down('Control');
    await page.keyboard.down('KeyA');
    await page.keyboard.up('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
  }

  async function typeInField(page: any, selector: string, value: string, click= true, confirmingSelector?: string){
    await page.waitForSelector(selector);
    await page.focus(selector);
    if (click) await page.click(selector);
    await page.keyboard.type(value);
    if (confirmingSelector) await page.waitForSelector(confirmingSelector);
  }

  async function selectValue(page: any, fieldSelector: string, menuSelector: string, option = 1){
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
    await this.page.keyboard.type(phoneNumberS, {delay: 120});

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

  it('sing up button -- id 31', async () => {
    await click(this.page, nextFirstPageBtnS, cardGroupS + "(1)");
  })

  it('card number page -- id 33', async () => {
    for (let i = 1; i < 5; i++){
      const cardSection = cardGroupS + "(" + i + ")";
      await typeInField(this.page, cardSection, Math.floor(Math.random() * (9999-1111) + 1111).toString());
    }
    await click(this.page, addCardBtnS, confirmCardBtnS);
  })

  it('change card -- id 35 problem', async () => {
    await this.page.waitFor(3000);
    await click(this.page, changeCardBtnS, cardGroupS + "(1)")
    for (let i = 1; i < 5; i++){
      const cardSection = cardGroupS + "(" + i + ")";
      await typeInField(this.page, cardSection, Math.floor(Math.random() * (9999-1111) + 1111).toString());
    }
    await click(this.page, addCardBtnS, confirmCardBtnS);
  })

  it('confirm card page -- id 38', async () => {
    await typeInField(this.page, confirmAmountFieldS, confirmAmountFieldV);
    await click(this.page, confirmAmountBtnS, nextBtnS);
  })

  it('next to discount page -- id 40', async () => {
    await click(this.page, nextBtnS, discountContactBtn);
    await click(this.page, discountContactBtn);
  })

  it('contact discount form -- id 43', async () => {
    await typeInField(this.page, discountNameS, discountNameV);

    await this.page.waitForSelector(discountPhoneS);
    await this.page.focus(discountPhoneS);
    await this.page.keyboard.type(discountPhoneV, {delay: 120});

    await typeInField(this.page, discountContactTypeS, discountContactTypeV);
    await click(this.page, saveContactBtnS);
  })

  it('sign credit -- id 46', async () => {
    await this.page.waitFor(500);
    await click(this.page, singBtnS, smsFieldS);
  })

  it('wrong sms code -- id 49 problem', async () => {
    await typeInField(this.page, smsFieldS, '000000');
    for (let i = 0; i < 10; i++) {
      await this.page.waitFor(200);
      await click(this.page, singBtnS);
    }
    try{await this.page.waitForNavigation({ waitUntil: 'networkidle0' })} catch (e) {}
    await assert.strictEqual(this.page.url(), 'http://localhost:3000/register')
  })

  // it('end', async () => {
  //   await this.page.waitForSelector('s');
  // })
});
