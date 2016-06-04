angular.module("newsSummaryApp")
  .controller("NewsSummaryController", ["GetNewsService", function(GetNewsService) {
    
    var self = this;
    var getnews = GetNewsService;

    getnews.getNews().then(function(response){
    	self.headlines = response;
    })

  }])
  .controller("StoryController", ["GetNewsService", '$routeParams', '$sce', function(GetNewsService,$routeParams,$sce){

    var self = this;
    var getnews = GetNewsService;
    var params = $routeParams;
    var sce = $sce;

    getnews.getStory(params.id).then(function(response){
      self.story = sce.trustAsHtml(response);
    });

  }])
