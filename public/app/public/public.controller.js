angular.module('app')

.controller('PublicCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
  $rootScope.isLoginPage = false;
  $scope.headerBg = $scope.headerBg;
}])