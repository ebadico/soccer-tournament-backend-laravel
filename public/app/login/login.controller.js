angular.module('app')

.controller('LoginCtrl', ['$auth', '$state', '$scope', '$rootScope', '$http', 'Auth', function($auth, $state, $scope, $rootScope, $http, Auth ){
  $rootScope.isLoginPage = true;
  $scope.loginLoading = false;
  $scope.loginError = '';
  $scope.credential = {};
  $scope.login = function(credential){
    $scope.loginLoading = !$scope.loginLoading;
    $auth.login(credential).then(function(res) {
      $state.go('admin.dashboard');
    }, function(err){
      $scope.loginLoading = !$scope.loginLoading;
      $scope.loginError = 'Credenziali non corrette, riprova!';
    });
  }

}])