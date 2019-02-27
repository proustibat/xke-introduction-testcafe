import { RequestLogger } from 'testcafe';
import HomePage from './models/home';
import PostsPage from './models/posts';
import ArticlePage from './models/article';
import AddPage from './models/add';
import ToastPage from './models/toast';

const homePage = new HomePage();
const postsPage = new PostsPage();
const articlePage = new ArticlePage();
const addPage = new AddPage();
const toastPage = new ToastPage();

const url = 'http://localhost:5000';

const logger = RequestLogger(
  { url, method: 'get' },
  { logResponseHeaders: true, logResponseBody: true }
);

fixture`Navigation`.page(url).beforeEach(async t => {
  await t.click(homePage.startBtn);
  await postsPage.isPageDisplayed();
});

test('Access to an article from the home page', async t => {
  const text = await postsPage.clickFirstLink();

  await t.expect(await articlePage.title.innerText).eql(text);
});

test.requestHooks(logger)(
  'Access to the form and posting an article, coming from home',
  async t => {
    await t.click(await postsPage.addBtn);

    await addPage.isPageDisplayed();
    await addPage.submitForm('How TestCafe is awesome!', 'Bla Bli Blou');

    await t.expect(logger.contains(r => r.response.statusCode === 200)).ok();

    await toastPage.isToastDisplayed();
  }
);
