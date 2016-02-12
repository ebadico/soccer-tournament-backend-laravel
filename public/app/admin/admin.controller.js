angular.module('app')

.controller('AdminCtrl', ['$auth', '$scope', '$rootScope', '$state', 'Auth', 'authResolve', function($auth, $scope, $rootScope, $state, Auth, authResolve){
  $rootScope.framework = 'bower_components/bootstrap/dist/css/bootstrap.css';
  $rootScope.location = 'admin';

  if(!authResolve.auth){
    $state.go('public.login');
  }

  $scope.logout = function(){
    $auth.logout();
    $state.reload();
  }

}])