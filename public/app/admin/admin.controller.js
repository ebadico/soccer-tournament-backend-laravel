angular.module('app')

.controller('AdminCtrl', function($auth, $scope, $rootScope, $state, Auth){
  if(!$auth.isAuthenticated()){
    $state.go('public.login');
  }

  $scope.logout = function(){
    $auth.logout();
    $state.reload();
  }
})