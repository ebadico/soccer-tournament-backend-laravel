angular.module('app')

.controller('PublicSingleNewsCtrl', ['$scope', 'ResolvedPost', '$window', function($scope, ResolvedPost, $window){
  $window.fbAsyncInit();
  $scope.post = ResolvedPost;
  $scope.CURRENT_URL = $window.location.href;

}])