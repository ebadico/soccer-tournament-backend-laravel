angular.module('app')

.controller('PublicRulesCtrl', ['$scope', 'News', function($scope, News){
  $scope.rules = {};

  News.index('rules')
  .then(function(res){
    $scope.rules = res.data[0];
  }, function(err){
    console.log("rules.controller.js :10", err);
  });
  
}])