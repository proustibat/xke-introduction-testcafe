import { Selector } from 'testcafe';

export default class ArticlePage {
  constructor() {
    this.title = Selector('h4');
  }
}
