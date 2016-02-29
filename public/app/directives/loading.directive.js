angular.module('app')
.directive('loading', function(){
  return {
      restrict: 'E', // this allows restriction of blink to an HTML element.
      templateUrl: 'app/directives/templates/loading.html',
      scope: {
        show: '='
      }
  };
})