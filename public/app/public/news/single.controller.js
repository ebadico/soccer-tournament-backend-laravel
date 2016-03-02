angular.module('app')

.controller('PublicSingleNewsCtrl', ['$scope', 'ResolvedPost', function($scope, ResolvedPost){
  $scope.post = ResolvedPost;
}])