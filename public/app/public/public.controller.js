angular.module('app')

.controller('PublicCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
  $rootScope.framework = 'bower_components/foundation-sites/dist/foundation.min.css';
  $rootScope.location = 'public';
}])