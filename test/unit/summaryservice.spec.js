describe('SummaryService',function(){

	beforeEach(module('newsSummaryApp'));

	var service;
	var http;
	var data = {text: 'Here is the full text',sentences:['These','Are','The','Sentences']}

	beforeEach(inject(function($httpBackend,SummaryService){
		service = SummaryService;
		http = $httpBackend;
	}));

	it('returns a promise containing an array of sentences summarising the story', function(){
  	http.expectGET('http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=https://www.theguardian.com/1').respond(data);
  	service.getSummary('1').then(function(response){
  		expect(response).toEqual(['These','Are','The','Sentences'])
  	});
  	http.flush();
  });

})