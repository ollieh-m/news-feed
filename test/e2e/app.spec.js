describe("app", function() {

	var mock = require('protractor-http-mock');
	var newsData = {response:{results:[{dummyattribute:'dummyvalue',id:1,webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:2,webTitle:'Headline2'}]}};
  var storyData = {response:{content:{fields:{body:"This is a full story"}}}};

  beforeEach(function(){
    mock([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian',
        method: 'GET'
      },
      response: {
        data: newsData
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

  it("should display a list of headlines on the homepage", function(){
  	browser.get('/');
  	var headlines = ($$('.headline'));
  	expect(headlines.get(0).getText()).toEqual('Headline1');
  	expect(headlines.get(1).getText()).toEqual('Headline2');
  });

  it("should display the full story when you click full story", function(){
    browser.get('/');
    mock.add([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/guardian',
        method: 'GET'
      },
      response: {
        data: storyData
      }
    }]);
    ($$('.full')).first().click();
    expect($('.text').getText()).toEqual('This is a full story');
  });
  
});
