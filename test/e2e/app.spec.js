describe("app", function() {

	var mock = require('protractor-http-mock');
	var newsData = {response:{results:[{dummyattribute:'dummyvalue',id:1,webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:2,webTitle:'Headline2'}]}};
  var storyData = {}

  beforeEach(function(){
    mock([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics',
        method: 'GET'
      },
      response: {
        data: newsData
      }
    }]);
    mock([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/' + newsData.response.results[0].id + '?show-fields=body',
        method: 'GET'
      },
      response: {
        data: storyData
      }
    }]);
  });

  afterEach(function(){
    mock.teardown();
  });

  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("News Summary");
  });

  it("should display a list of 10 headlines on the homepage", function(){
  	browser.get('/');
  	var headlines = ($$('.headline'));
  	// expect(headlines.get(0).getText()).toEqual('Headline1');
  	// expect(headlines.get(1).getText()).toEqual('Headline2');
    expect(headlines.count()).toEqual(10)
  });

  it("should display a summary of a story when you click on it", function(){
    browser.get('/');
    ($$('.summary')).first().click();
    expect($('.text').getText).toEqual('This is a story summary');
  });
  



});
