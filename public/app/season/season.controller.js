angular
	.module('app')
	.controller('SeasonCtrl', ['$scope', '$http', 'Season', 'toastr', function($scope, $http, Season, toastr){
	
			$scope.seasons = null;
	
			getSeasons();
	
			$scope.create = function(season){
				Season.create(season)
				.then(function(res){
					if(res.status === 200){
						toastr.success('New Season Created!');
					}
					getSeasons();
				},function(err){
					toastr.error(err, 'Errore...');
				});
			}
	
			$scope.delete = function(season){
				if(confirm('Sicuro di volerlo rimuovere?')){
					Season.delete(season)
					.then(function(res){
						console.log("season.controller.js :30", res);
						toastr.warning('Rimosso!');
						getSeasons();
					}, function(err){
						toastr.error(err, 'Errore...');
						console.log("season.controller.js :32", err);
					})
				}
			}
	
			$scope.edit = function(season){
				if(confirm('Vuoi settare la stagione ' + season.year + " come stagione corrente?")){
					Season.edit(season)
					.then(function(data){
						console.log("season.controller.js :39", data);
						$scope.seasons = [];
						getSeasons();
					}, function(err){
						console.log("season.controller.js :41", err);
					})
				}
			}
	
			function getSeasons(){
				Season.get()
					.then(function(data){
						$scope.seasons = data.data;
					},function(err){
						console.log("season.controller.js :12", err);
					});
			}
	
		}])