angular
  .module('app')

  .filter('spaceless', function() {
    return function(input) {
      return input.replace(new RegExp(" ", 'g'), "_");
    };
  })

  /** FOR YOUTUBE LINKS */
  .filter('trustedUrl', ['$sce', function($sce) {
      return function(input) {
        return $sce.trustAsResourceUrl(input);
      };
    }])