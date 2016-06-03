describe("NewsSummaryController", function() {
  var controller;
  var getnews;
  var http;
  var data = {response:{results:[{dummyattribute:'dummyvalue',id:1,webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:2,webTitle:'Headline2'}]}}


  beforeEach(module('newsSummaryApp'));

  beforeEach(inject(function($controller,$httpBackend,GetNewsService) {
    controller = $controller("NewsSummaryController");
    getnews = GetNewsService;
    http = $httpBackend;
    http.expect('GET','http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics').respond(data);
  	http.flush();
  }));

  it("initializes with a number of headline objects in a headline array", function() {
    expect(controller.headlines[0].headline).toEqual('Headline1');
    expect(controller.headlines[1].headline).toEqual('Headline2');
  });
});
