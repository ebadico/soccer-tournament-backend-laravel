angular.module('app')

.controller('DayCtrl', function($rootScope, $scope, $http, toastr, Day, Round){

	$scope.rounds = [];
	$scope.days = [];
	$scope.day = {};

	getRounds();
	getDays();

	$scope.create = function(day){
		Day.create(day)
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

	$scope.delete = function(day){
		if(confirm('Sicuro di volerlo rimuovere?')){
			Day.delete(day)
			.then(function(res){
				console.log("day.controller.js :30", res);
				toastr.warning('Rimosso!');
				getDays();
			}, function(err){
				toastr.error(err, 'Errore...');
				console.log("day.controller.js :32", err);
			})
		}
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