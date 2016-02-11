angular.module('app')

.controller('AdminCtrl', ['$auth', '$scope', '$rootScope', '$state', 'Auth', 'authResolve', function($auth, $scope, $rootScope, $state, Auth, authResolve){
  // if(!$auth.isAuthenticated()){
  //   $state.go('public.login');
  // }
  
  console.log("admin.controller.js :8", authResolve.auth);

  if(!authResolve.auth){
    $state.go('public.login');
  }

  $scope.logout = function(){
    $auth.logout();
    $state.reload();
  }
}])