import { Selector } from 'testcafe';

fixture `Navigation`.page `http://localhost:3000`;

test('Access to an article from the home page', async t => {
  // WHEN (enter click on home page)
  const startBtn = await Selector('a').nth(1);
  await t.click(startBtn);

  // THEN (posts page elements verification)
  await t.expect(await Selector('h4').innerText).eql('Posts Page');
  const links = await Selector('ul').child('a');
  await t.expect(await links.count).eql(100);

  // WHEN (click on first article link)
  const firstLink = await links.nth(0).child('div');
  const firstLinkText = await firstLink.innerText; // save link value
  await t.click(firstLink);

  // THEN (article page)
  const titleArticleEl = await Selector('h4');
  const titleArticleText = await titleArticleEl.innerText;
  await t.expect(titleArticleText).eql(firstLinkText);
});

test.only('Access to the form and posting an article, coming from home', async t => {
  // WHEN (enter click on home page)
  const startBtn = await Selector('a').nth(1);
  await t.click(startBtn);

  // THEN (posts page elements verification)
  await t.expect(await Selector('h4').innerText).eql('Posts Page');
  const links = await Selector('ul').child('a');
  await t.expect(await links.count).eql(100);

  // Check if a "plus button" exists
  const addBtn = await Selector('button[aria-label=Add]');
  await t.expect(addBtn.exists).ok();

  // Click on the button
  await t.click(addBtn);

  // Check if we've navigated to the form page
  const formEl = await Selector('form');
  await t.expect(formEl.exists).ok();

  // Enter a title
  const inputTitle = await formEl.find('#field-title');
  await t.typeText(inputTitle, 'How TestCafe is awesome!');

  // Enter a content
  const textAreaField = await formEl.find('#field-content');
  await t.typeText(textAreaField, 'Bla Bli Blou');

  // Submit the form
  const submitBtn = await formEl.find('button');
  await t.click(submitBtn);

  // Check the success notification
  const toastEl = await Selector('.Toastify').child('div');
  await t.expect(toastEl.exists).ok();
});