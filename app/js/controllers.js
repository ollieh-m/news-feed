angular.module("newsSummaryApp")
  .controller("NewsSummaryController", ["GetNewsService", "GetImageService", function(GetNewsService,GetImageService) {
    
    var self = this;
    var getnews = GetNewsService;
    var getimage = GetImageService;

    var extractSearch = function(headline){
      return headline.replace(/(([^\s]+\s\s*){3})(.*)/,"$1")
    };

    getnews.getNews().then(function(response){
    	self.headlines = response;
      self.headlines.map(function(headline){
        getimage.getImage(extractSearch(headline.headline)).then(function(imageurl){
          headline.image = imageurl;
        });
      });
    }); 

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
  .controller("SummaryController", ["SummaryService", '$routeParams', function(SummaryService,$routeParams){

    var self = this;
    var getsummary = SummaryService;
    var params = $routeParams;

    getsummary.getSummary(params.id).then(function(response){
      self.summary = response;
    });

  }])
