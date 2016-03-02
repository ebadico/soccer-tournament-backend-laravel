angular
.module('app')
.controller('HomeCtrl', ['$scope', 'Round', 'News', 'Media', function($scope, Round, News, Media){
  
  News.index('news')
  .then(function(res){
    $scope.news = res.data;
  }, function(err){
    console.log("home.controller.js :9", err);
  })

  Media.getSponsors()
  .then(function(res){
    $scope.sponsors = res.data;
  }, function(err){
    console.log("home.controller.js :16", err);
  })

  Media.getPhotos()
  .then(function(res){
    console.log("home.controller.js :21", res.data);
    $scope.photos = res.data;
  }, function(err){
    console.log("home.controller.js :23", err);
  })

  Round.get()
  .then(function(res){
    $scope.rounds = res.data;
  })

}])