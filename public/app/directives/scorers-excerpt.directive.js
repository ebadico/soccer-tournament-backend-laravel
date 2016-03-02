angular.module('app')

.directive('scorers', ['Player', function(Player){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/templates/scorers.html',
    scope: {
      round: '='
    },
    controller: function($scope){
      Player.get($scope.round.id)
      .then(function(res){
        console.log("scorers-excerpt.directive.js :13", res.data);
        $scope.scorers = res.data;
      });
    }
  };

}]);