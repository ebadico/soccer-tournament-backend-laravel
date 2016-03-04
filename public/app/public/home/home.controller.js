angular
.module('app')
.controller('HomeCtrl', ['$scope', 'Round', 'News', 'Media', 'Day', function($scope, Round, News, Media, Day){
 

  News.index('news')
  .then(function(res){
    $scope.news = res.data;
  }, function(err){
    console.log("home.controller.js :9", err);
  });

  Media.getSponsors()
  .then(function(res){
    $scope.sponsors = res.data;
  }, function(err){
    console.log("home.controller.js :16", err);
  });

  Media.getPhotos()
  .then(function(res){
    console.log("home.controller.js :21", res.data);
    $scope.photos = res.data;
  }, function(err){
    console.log("home.controller.js :23", err);
  });

  // Round.get()
  // .then(function(res){
  //   $scope.rounds = res.data;
  // });

  Day.last()
  .then(function(res){
    console.log("home.controller.js :35", res.data);
    $scope.days = res.data;
  }, function(err){
    console.log("home.controller.js :38", err);
  });

}])