angular.module('app')

.controller('SingleRoundCtrl', ['$stateParams', '$scope', '$http', 'toastr', 'Season', 'Round', 'Day', function($stateParams, $scope, $http, toastr, Season, Round, Day){

	$scope.round = {};
	$scope.editMode = false;
	
	getRound();

	$scope.createDay = function(){
		Day.create({ round_id:$scope.round.id })
			.then(function(res){
				console.log("day.controller.js :27", res);
				if(res.status === 200){
					toastr.success('Giornata creata!');
					getRound();
				}
			},function(err){
				console.log("day.controller.js :33", err);
				toastr.error(err, 'Errore...');
			});
	}	


	$scope.editRound = function(round){
		Round
			.edit(round)
			.then(function(res){
				$scope.editMode = false;
				getRound();
				toastr.success('Modificato!')
			}, function(err){
				toastr.error(err ,'Error...');
			});
	}

	$scope.deleteDay = function(day){
		if(confirm("Sicuro di volerlo rimuovere?")){
			Day
				.delete(day)
				.then(function(res){
					getRound();
					toastr.warning('Rimosso!');
				}, function(err){
					console.log("day.controller.js :42", err);
					toastr.error(err ,'Error...');
				});
		}
	}

	function getRound(){
		Round.getSingle($stateParams.round_id)
			.then(function(res){
				$scope.round = res.data;
				console.log("single.controller.js :53", res.data);
			},function(err){
				console.log("season.controller.js :12", err);
			});
	}

}])