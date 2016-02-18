//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('mainContent',function() {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant outputi
    templateUrl: 'app/public/directives/public-common-layout.html',
  };
})
