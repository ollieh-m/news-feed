describe('GetNewsService',function(){

	beforeEach(module('newsSummaryApp'));

	var service;
	var http;
	var data = {response:{results:[{dummyattribute:'dummyvalue',id:1,webTitle:'Headline1'},{dummyattribute:'dummyvalue',id:2,webTitle:'Headline2'}]}}

	beforeEach(inject(function(GetNewsService,$httpBackend) {
    service = GetNewsService;
    http = $httpBackend;
  }));

  it('returns a promise containing processed versions of stories from the Guardian API', function(){
  	http.expect('GET','http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics').respond(data);
  	service.getNews().then(function(response){
  		expect(response).toEqual([{id:1,headline:'Headline1'},{id:2,headline:'Headline2'}])
  	});
  	http.flush();
  });

});