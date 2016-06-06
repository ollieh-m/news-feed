describe("NewsSummaryController", function() {
  var controller;
  var getnews;
  var http;
  var data = {response:{results:[{dummyattribute:'dummyvalue',id:1,webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:2,webTitle:'Headline2'}]}};
  var imageData = {images:[{display_sizes:[{uri:'This is the image'}]},1,2]};

  beforeEach(module('newsSummaryApp'));

  beforeEach(inject(function($controller,$httpBackend,GetNewsService,GetImageService) {
    controller = $controller("NewsSummaryController");
    getnews = GetNewsService;
    getimage = GetImageService;
    http = $httpBackend;
    http.expect('GET','http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics').respond(data);
  	http.expect('GET','https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=Headline1').respond(imageData);
    http.expect('GET','https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=Headline2').respond(imageData);
    http.flush();
  }));

  it("initializes with a number of headline objects in a headline array", function() {
    expect(controller.headlines[0].headline).toEqual('Headline1');
    expect(controller.headlines[1].headline).toEqual('Headline2');
  });
});
