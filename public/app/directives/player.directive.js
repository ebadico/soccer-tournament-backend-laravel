angular.module('app')

.directive('playerContainer', [ function(){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/templates/player.html',
    transclude: true,
    scope: {
      player: '=player'
    },
    link:function(scope, el, attr){
      console.log("player.directive.js :11", scope);
    }
  };

}]);