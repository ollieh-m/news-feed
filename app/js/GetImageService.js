newsSummaryApp.service('GetImageService', ['$http', function($http){

var self = this;

	self.getImage = function(searchterm){
		var url = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=' + searchterm;
		var req = {
 			method: 'GET',
 			url: url,
			headers: {
			  'Api-Key':'zktndcn8cza8pzq978ayxd6y'
			}
 		}
		return $http(req).then(function(response){
			return response.data.images[0].display_sizes[0].uri;
		});
	};

}]);