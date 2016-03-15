//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('tableScorers',function() {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    templateUrl: 'app/directives/templates/table-scorers.html',
    scope:{
      players: '=players',
    },

    link: function (scope, el, attr, ctrl, transclude){

    },

    controller: function($scope, $rootScope, $stateParams){
      $rootScope.$watch('rounds', function(newVal, oldVal){
        $scope.rounds = newVal || [];
      });


      var limit = 10;
      $scope.scorerLimit = limit;

      $scope.ready = true;

      $scope.changeRound = function(round){
        $scope.roundFilterId = round.id;
        $scope.scorerLimit = limit;
        return true;
      }

      if($scope.roundFilterId){
        $scope.changeRound({ id: Number($scope.roundFilterId) });
      }

    }
  };
})
