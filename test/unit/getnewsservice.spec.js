describe('GetNewsService',function(){

	beforeEach(module('newsSummaryApp'));

	var service;
	var http;
	var headlinesData = {response:{results:[{dummyattribute:'dummyvalue',id:'1',webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:'2',webTitle:'Headline2'}]}}
  var storyData = {response:{content:{fields:{body:"This is a full story"}}}};


	beforeEach(inject(function(GetNewsService,$httpBackend) {
    service = GetNewsService;
    http = $httpBackend;
  }));

  it('returns a promise containing processed versions of stories from the Guardian API', function(){
  	http.expectGET('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics').respond(headlinesData);
  	service.getNews().then(function(response){
  		expect(response).toEqual([{id:'1',headline:'Headline1'},{id:'2',headline:'Headline2'}])
  	});
  	http.flush();
  });

  it('returns a promise containing the body of a story from the Guardian API', function(){
    http.expect('GET', 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/1?show-fields=body').respond(storyData);
    service.getStory('1').then(function(response){
      expect(response).toEqual('This is a full story')
    });
    http.flush();
  });

});