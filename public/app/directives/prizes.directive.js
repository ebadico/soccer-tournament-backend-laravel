angular.module('app')

.directive('prizeSlider', ['Prize', function(Prize){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/templates/prize-slider.html',
    controller: function($scope, $interval){
      Prize.get()
      .then(function(res){
        $scope.prizes = res.data;
      });
      
      $scope.currentIndex = 0;

      $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
      };

      $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
      };

      $interval(function(){
        var index = $scope.currentIndex + 1;
        if(index >= $scope.prizes.length) index = 0;
        $scope.setCurrentSlideIndex(index);
      }, 5000);

    },
  };

}]);