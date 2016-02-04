angular.module('app')

.controller('RoundCtrl', function($rootScope, $scope, $http, Season, Round){

	$scope.rounds = [];
	$scope.round = {};
	
	
	Round
		.get()
		.then(function(res){
			console.log(res);
		});	

	Round.get()
	.then(function(res){
		$scope.rounds = res.data;
	},function(err){
		console.log("season.controller.js :12", err);
	});

	$scope.createRound = function(round){
		Round.createRound(round)
		.then(function(res){
			if(res.status === 200){
				$scope.round = {};
			}
		})
	}

})