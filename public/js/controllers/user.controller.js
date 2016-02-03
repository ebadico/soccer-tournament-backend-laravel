angular.module('app')

.controller('UserCtrl', function($scope, Auth, $http){
	$scope.user = {};

	$scope.login = function(credential){
		if(credential.username){
			if( credential.pwd === credential.pwdRetype){
				$http.post('/api/user', credential)
				.then(function(data){
					console.log("user.controller.js :10", data);
				},function(err){
						console.log("user.controller.js :14", err);
					if(err){
						$scope.error = err.data;	
					}
				});
				
			}else{
				$scope.error = 'Password mismatch!';	
			}
		}else{
			$scope.error = 'No username provided!';
		}
	}



})