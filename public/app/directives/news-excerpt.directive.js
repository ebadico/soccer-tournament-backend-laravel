angular.module('app')

.directive('newsExcerpt', ['Player', function(Player){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/templates/news-excerpt.html',
    scope: {
      post: '='
    },
    controller: function($scope){
      
    }
  };

}]);