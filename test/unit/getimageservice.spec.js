describe('GetNewsService',function(){

	beforeEach(module('newsSummaryApp'));

	var service;
	var http;
  var imageData = {images:[{display_sizes:[{uri:'This is the image'}]},1,2]}

	beforeEach(inject(function(GetImageService,$httpBackend) {
    service = GetImageService;
    http = $httpBackend;
  }));

	it('returns a promise containing the uri of an image',function(){
		http.expectGET('https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=test').respond(imageData);
		service.getImage('test').then(function(response){
			expect(response).toEqual('This is the image');
		});
	});

});
