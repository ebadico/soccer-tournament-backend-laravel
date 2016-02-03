angular.module('app')

.controller('LoginCtrl', function($scope, Auth){
	$scope.login = {};

	$scope.loginFormSubmit = function(credential){
		Auth.login(credential);
	}



})