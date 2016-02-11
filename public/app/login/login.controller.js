angular.module('app')

.controller('LoginCtrl', ['$auth', '$state', '$scope', '$rootScope', '$http', 'Auth', function($auth, $state, $scope, $rootScope, $http, Auth){
  $scope.credential = {};

  $scope.login = function(credential){
    $auth.login(credential).then(function(res) {
      console.log("login.controller.js :8", res);
      $state.go('admin');
    });
  }

}])