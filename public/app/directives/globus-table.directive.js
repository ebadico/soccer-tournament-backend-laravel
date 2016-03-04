//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('globusTable',function() {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant outputi
    templateUrl: 'app/directives/templates/globus-table.html',
    scope: false,
    link: function (scope, el, attr, ctrl, transclude){
      scope.head = attr.head === 'true' ? true : false;
    },
    controller: function($scope, $transclude, Round){
      $transclude($scope);
      $scope.ready = true;

      $scope.changeRound = function(round){
        $scope.roundFilterId = round.id;
        return true;
      }

      if($scope.roundFilterId){
        $scope.changeRound({ id: Number($scope.roundFilterId) });
      }

    }
  };
})
