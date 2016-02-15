angular.module('app')

.controller('LoginCtrl', ['$auth', '$state', '$scope', '$rootScope', '$http', 'Auth', 'authResolve', function($auth, $state, $scope, $rootScope, $http, Auth, authResolve ){
  $scope.credential = {};

  if(authResolve.auth){
    $state.go('admin.dashboard');
  }

  $scope.login = function(credential){
    $auth.login(credential).then(function(res) {
      $state.go('admin.dashboard');
    });
  }

}])