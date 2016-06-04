newsSummaryApp.service('GetNewsService', ['$http', function($http){

var self = this;

	self.getNews = function(){
		return $http.get('http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics').then(function(response){
			return response.data.response.results.map(function(story){
				return { id:story.id, headline:story.webTitle }
			})
		})
	}

	self.getStory = function(id){
		var url = 'http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/' + id + '?show-fields=body';
		return $http.get(url).then(function(response){
			return response.data.response.content.fields.body;
		});
	};

}]);
