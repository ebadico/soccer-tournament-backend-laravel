angular.module('app')

.controller('RoundsCtrl', ['$rootScope', '$scope', '$http', 'toastr', 'Season', 'Round', function($rootScope, $scope, $http, toastr, Season, Round){

	$scope.rounds = [];
	$scope.round = {};
	
	getRounds();
	

	$scope.create = function(round){
		Round.create(round)
		.then(function(res){
			if(res.status === 200){
				$scope.round = {};
				toastr.success('Girone creato!');
			}
			getRounds();
		},function(err){
			toastr.error(err, 'Errore...');
		})
	}

	$scope.edit = function(round){
		Round
			.edit(round)
			.then(function(res){
				getRounds();
				toastr.success('Modificato!')
			}, function(err){
				toastr.error(err ,'Error...');
			});
	}

	$scope.delete = function(round){
		if(confirm("Sicuro di volerlo rimuovere?")){
			Round
				.delete(round)
				.then(function(res){
					getRounds();
					toastr.warning('Rimosso!');
				}, function(err){
					console.log("round.controller.js :42", err);
					toastr.error(err ,'Error...');
				});
		}
	}

	function getRounds(){
		Round.get()
			.then(function(res){
				$scope.rounds = res.data;
			},function(err){
				console.log("season.controller.js :12", err);
			});
	}

}])