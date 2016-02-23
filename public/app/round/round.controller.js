angular.module('app')

.controller('RoundsCtrl', ['$rootScope', '$scope', '$http', 'toastr', 'Season', 'Round', 'Media', function($rootScope, $scope, $http, toastr, Season, Round, Media){
	$scope.alphabet = ['A','B','C','D','E','F','G','H','I','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	$scope.seasons = [];
	$scope.rounds = [];
	$scope.round = {};
	
	getSeasons(function(){
		if(!!$scope.seasons.length){
			getRounds();
		}
	});	
	

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
					console.log("round.controller.js :40", res);
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
				$scope.seasons = [];
				console.log("season.controller.js :12", err);
			});
	}

	function getSeasons(callback){
		Season.get()
			.then(function(res){
				$scope.seasons = res.data;
				callback();
			},function(err){
				$scope.seasons = [];
				callback();
				console.log("season.controller.js :12", err);
			});
	}

}])