angular
.module('app')
.controller('HomeCtrl', ['$scope', 'News', 'Media', function($scope, News, Media){
  
  News.index('news')
  .then(function(res){
    $scope.news = res.data;
  });

  Media.getSponsors()
  .then(function(res){
    $scope.sponsors = res.data;
  });


}])