angular.module('app')

.controller('PublicCtrl', ['$rootScope', '$scope', function($rootScope, $scope){
  $rootScope.location = 'public';
}])