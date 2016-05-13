import { AllSpiceNg2Page } from './app.po';

describe('all-spice-ng2 App', function() {
  let page: AllSpiceNg2Page;

  beforeEach(() => {
    page = new AllSpiceNg2Page();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('all-spice-ng2 works!');
  });
});
