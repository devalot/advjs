import { DiscographyPage } from './app.po';

describe('discography App', () => {
  let page: DiscographyPage;

  beforeEach(() => {
    page = new DiscographyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
