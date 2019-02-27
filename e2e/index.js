import { RequestLogger, RequestMock } from 'testcafe';
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

// A URL to which Google Analytics sends data.
const collectDataGoogleAnalyticsRegExp = new RegExp(
  'https://www.google-analytics.com/r/collect'
);

// Technically, Google Analytics sends an XHR request for a GIF image.
// So, we prepare a mocked response with binary data.
const mockedResponse = Buffer.from([
  0x47,
  0x49,
  0x46,
  0x38,
  0x39,
  0x61,
  0x01,
  0x00,
  0x01
]);

const mock = RequestMock()
  .onRequestTo(collectDataGoogleAnalyticsRegExp)

  // We respond to Analytics requests with the prepared data
  // represented as a GIF image and change the status code to 202.
  .respond(mockedResponse, 202, {
    'content-length': mockedResponse.length,
    'content-type': 'image/gif'
  });

fixture`Navigation`
  .page(url)
  .requestHooks(mock)
  .beforeEach(async t => {
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
