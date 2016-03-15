angular.module('app')

.controller('PublicSingleNewsCtrl', ['$rootScope', '$scope', 'ResolvedPost', '$window', function($scope, ResolvedPost, $window){
  $scope.post = ResolvedPost;

  // setTimeout(function(){
  //   $window.fbAsyncInit();
  // }, 2000);

}])