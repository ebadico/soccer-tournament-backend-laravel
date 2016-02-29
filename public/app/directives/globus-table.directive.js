//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('globusTable',function() {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant outputi
    templateUrl: 'app/directives/templates/globus-table.html',
    scope:{
      'head': "@"
    },
    controller: function($scope, Round){
      $scope.ready = false;
      $scope.rounds = [];
      Round.get()
      .then(function(res){
        console.log(res.data);
        $scope.rounds = res.data;
        $scope.ready = true;
      });
      console.log("globus-table.directive.js :21", $scope.teams);
      $scope.changeRound = function(round){
        $scope.roundFilterId = round.id;
        return true;
      }
    }
  };
})
