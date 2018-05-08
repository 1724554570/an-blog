import { ViewsPage } from './app.po';

describe('views App', () => {
  let page: ViewsPage;

  beforeEach(() => {
    page = new ViewsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
