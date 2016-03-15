angular.module('app')

.controller('PublicSingleNewsCtrl', ['$rootScope', '$scope', 'ResolvedPost', '$window', function($scope, ResolvedPost, $window){
  $scope.post = ResolvedPost;
  $scope.CURRENT_URL = $window.location.href;
  $scope.BASE_URL = $window.location.host;

  $rootScope.FB_post_title = '';
  $rootScope.FB_post_excerpt = '';
  $rootScope.FB_post_image = '';
  $rootScope.FB_post_url = $window.location.href;


  setTimeout(function(){
    $window.fbAsyncInit();
  }, 2000);

}])