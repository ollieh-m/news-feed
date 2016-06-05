newsSummaryApp.service('SummaryService', ['$http', function($http){

var self = this;

	self.getSummary = function(id){
		var url = 'http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=https://www.theguardian.com/' + id;
		return $http.get(url).then(function(response){
			return response.data.sentences;
		});
	};

}]);