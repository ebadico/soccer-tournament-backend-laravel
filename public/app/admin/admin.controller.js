angular.module('app')

.controller('AdminCtrl', ['$auth', '$scope', '$rootScope', '$state', 'Auth', 'authResolve', function($auth, $scope, $rootScope, $state, Auth, authResolve){
  $rootScope.location = 'admin';

  if(!authResolve.auth){
    $state.go('public.login');
  }

  $scope.logout = function(){
    $auth.logout();
    $state.reload();
  }
}])