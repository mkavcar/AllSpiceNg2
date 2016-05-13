export class AllSpiceNg2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('all-spice-ng2-app h1')).getText();
  }
}
