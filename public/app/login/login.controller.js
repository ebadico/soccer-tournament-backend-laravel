angular.module('app')

.controller('LoginCtrl', function($auth, $state, $scope, $rootScope, $http, Auth){
	$scope.credential = {};

  if($auth.isAuthenticated()){
    $state.go('admin');
  }

	$scope.login = function(credential){
		$auth.login(credential).then(function(res) {
      console.log("login.controller.js :8", res);
      $state.go('admin');
    });
	}

})