angular.module('app')

.directive('modal', ['Player', function(Player){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/templates/modal.html',
    controller: function($scope, $stateParams){
      $scope.image = $stateParams.item;
    }
  };

}]);