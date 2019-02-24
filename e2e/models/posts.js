import { Selector, t } from 'testcafe';

export default class PostsPage {
  constructor() {
    this.title = Selector('h4');
    this.links = Selector('ul').child('a');
    this.addBtn = Selector('button[aria-label=Add]');
  }

  async isPageDisplayed() {
    await t.expect(await this.title.innerText).eql('Posts Page');
    await t.expect(await this.links.count).eql(100);
    await t.expect(await this.addBtn.exists).ok();
  }

  async clickFirstLink() {
    const link = await this.links.nth(0).child('div');
    const linkText = await link.innerText;
    await t.click(link);
    return linkText;
  }
}
