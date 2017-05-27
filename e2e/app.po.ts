import { browser, element, by } from 'protractor';

export class QueroDinheirosPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingText() {
    return element(by.css('app-root h2')).getText();
  }
}
