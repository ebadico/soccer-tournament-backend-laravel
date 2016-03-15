angular.module('app')

.controller('PublicSingleNewsCtrl', ['$scope', 'ResolvedPost', '$window', function($scope, ResolvedPost, $window){
  $scope.post = ResolvedPost;

  setTimeout(function(){
    $window.fbAsyncInit();
  }, 2000);

}])