import { TimelinePage } from './app.po';

describe('timeline App', function() {
  let page: TimelinePage;

  beforeEach(() => {
    page = new TimelinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
