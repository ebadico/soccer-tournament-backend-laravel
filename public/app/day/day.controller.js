angular.module('app')

.controller('DayCtrl', function($rootScope, $scope, $http, Day, Round){

	$scope.rounds = [];
	$scope.days = [];
	$scope.day = {};

	Round.get()
	.then(function(res){
		$scope.rounds = res.data;
		console.log("day.controller.js :12", res.data);
	},function(err){
		console.log("season.controller.js :20", err);
	});

	Day.get()
	.then(function(res){
		$scope.days = res.data;
	},function(err){
		console.log("season.controller.js :20", err);
	});

	$scope.createDay = function(day){
		Day.createRound(day)
		.then(function(res){
			console.log("day.controller.js :27", res);
			if(res.status === 200){
				$scope.day = {};
			}
		});
	}

})