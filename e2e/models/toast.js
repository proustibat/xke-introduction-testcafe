import { Selector, t } from 'testcafe';

export default class ToastPage {
  constructor() {
    this.toastEl = Selector('.Toastify').child('div');
  }

  async isToastDisplayed() {
    await t.expect(await this.toastEl.exists).ok();
  }
}
