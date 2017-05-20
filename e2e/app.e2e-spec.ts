import { QueroDinheirosPage } from './app.po';

describe('quero-dinheiros App', () => {
  let page: QueroDinheirosPage;

  beforeEach(() => {
    page = new QueroDinheirosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
