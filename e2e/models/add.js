import { Selector, t } from 'testcafe';

export default class AddPage {
  constructor() {
    this.form = Selector('form');
    this.inputTitle = this.form.find('#field-title');
    this.textAreaField = this.form.find('#field-content');
    this.submitBtn = this.form.find('button');
  }

  async isPageDisplayed() {
    await t.expect(await this.form.exists).ok();
    await t.expect(await this.inputTitle.exists).ok();
    await t.expect(await this.textAreaField.exists).ok();
    await t.expect(await this.submitBtn.exists).ok();
  }

  async submitForm(title, content) {
    await t
      .typeText(this.inputTitle, title)
      .typeText(this.textAreaField, content)
      .click(this.submitBtn);
  }
}
