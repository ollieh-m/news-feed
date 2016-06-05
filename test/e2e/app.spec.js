describe("app", function() {

	var mock = require('protractor-http-mock');
	var newsData = {response:{results:[{dummyattribute:'dummyvalue',id:1,webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:2,webTitle:'Headline2'}]}};
  var storyData = {response:{content:{fields:{body:"This is a full story"}}}};
  var summaryData = {text: 'Here is the full text',sentences:['These','Are','The','Sentences']}

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
  
  it('should display a summary of the story when you click summary',function(){
    browser.get('/');
    mock.add([{
      request: {
        path: 'http://news-summary-api.herokuapp.com/aylien',
        method: 'GET'
      },
      response: {
        data: summaryData
      }
    }]);
    ($$('.summary')).first().click();
    var sentences = ($$('.sentence'));
    expect(sentences.get(0).getText()).toEqual('These');
    expect(sentences.get(1).getText()).toEqual('Are');
    expect(sentences.get(2).getText()).toEqual('The');
    expect(sentences.get(3).getText()).toEqual('Sentences');
  });

});
