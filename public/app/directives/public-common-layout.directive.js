//Creat a directive module, and create directive named 'blink'
angular
.module('app')
.directive('mainContent', [
  'Media',
  function(Media) {
  return {
    restrict: 'E', // this allows restriction of blink to an HTML element.
    transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant outputi
    templateUrl: 'app/directives/templates/public-common-layout.html',
    controller: function($scope){
        $scope.sponsors = [];
        Media
          .getSponsors()
          .then(function(res){
            $scope.sponsors = res.data;
          });
    }
  };
}])
