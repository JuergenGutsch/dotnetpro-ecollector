import { DotnetproECollectorClientPage } from './app.po';

describe('dotnetpro-ecollector-client App', function() {
  let page: DotnetproECollectorClientPage;

  beforeEach(() => {
    page = new DotnetproECollectorClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
