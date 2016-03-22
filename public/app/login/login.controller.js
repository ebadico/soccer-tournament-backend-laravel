angular.module('app')

.controller('LoginCtrl', ['$auth', '$state', '$scope', '$rootScope', '$http', 'Auth', function($auth, $state, $scope, $rootScope, $http, Auth ){
  $rootScope.isLoginPage = true;
  $scope.loginLoading = false;
  $scope.loginError = '';
  $scope.credential = {};
  $scope.login = function(credential){
    $scope.loginLoading = !$scope.loginLoading;
    $auth.login(credential).then(function(res) {
      console.log("login.controller.js :11", res);
      $state.go('admin.dashboard');
    }, function(err){
      console.log("login.controller.js :14", err);
      $scope.loginLoading = !$scope.loginLoading;
      $scope.loginError = 'Credenziali non corrette, riprova!';
    });
  }

}])