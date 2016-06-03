newsSummaryApp.service('GetNewsService', ['$http', function($http){

var self = this;

	self.getNews = function(){
		return $http.get('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics').then(function(response){
			console.log(response);
			return response.data.response.results.map(function(story){
				return { id:story.id, headline:story.webTitle }
			})
		})
	}

}]);
