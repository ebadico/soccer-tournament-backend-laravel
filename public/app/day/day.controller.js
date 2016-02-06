angular.module('app')

.controller('DayCtrl', function($rootScope, $scope, $http, toastr, Day, Round){

	$scope.rounds = [];
	$scope.days = [];
	$scope.day = {};

	getRounds();
	getDays();

	$scope.createDay = function(day){
		Day.createRound(day)
		.then(function(res){
			console.log("day.controller.js :27", res);
			if(res.status === 200){
				$scope.day = {};
				toastr.success('Giornata creata!');
				getDays();
			}
		},function(err){
			console.log("day.controller.js :33", err);
			toastr.error(err, 'Errore...');
		});
	}


	function getRounds(){
		Round.get()
			.then(function(res){
				$scope.rounds = res.data;
				console.log("day.controller.js :12", res.data);
			},function(err){
				console.log("season.controller.js :20", err);
			});
	}

	function getDays(){
		Day.get()
			.then(function(res){
				$scope.days = res.data;
			},function(err){
				console.log("season.controller.js :20", err);
			});
	}

})