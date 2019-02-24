import { Selector } from 'testcafe';

export default class HomePage {
  constructor() {
    this.startBtn = Selector('a').nth(1);
  }
}
