angular.module("newsSummaryApp")
  .controller("NewsSummaryController", ["GetNewsService", '$routeParams', function(GetNewsService,$routeParams) {
    
    var self = this;
    var getnews = GetNewsService;
    var params = $routeParams;

    getnews.getNews().then(function(response){
    	self.headlines = response;
    })

    self.story = function(){
    	return params.id
    };

  }])
  .controller("StorySummaryController", '$routeParams', function($routeParams))
