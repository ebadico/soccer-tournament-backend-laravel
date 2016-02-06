angular.module('app')

.controller('SeasonCtrl', function($scope, $http, Season, toastr){

	$scope.seasons = null;

	Season.get()
	.then(function(data){
		$scope.seasons = data.data;
	},function(err){
		console.log("season.controller.js :12", err);
	});

	$scope.createSeason = function(){
		Season.createSeason()
		.then(function(res){
			if(res.status === 200){
				toastr.success('New Season Created!');
			}
		},function(err){
			toastr.error(err, 'Errore...');
		});
	}

})