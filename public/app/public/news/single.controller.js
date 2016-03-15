angular.module('app')

.controller('PublicSingleNewsCtrl', ['$scope', 'ResolvedPost', '$window', function($scope, ResolvedPost, $window){
  $scope.post = ResolvedPost;
  $scope.CURRENT_URL = $window.location.href;
  $scope.BASE_URL = $window.location.host;

  // setTimeout(function(){
  //   $window.fbAsyncInit();
  // }, 2000);

}])