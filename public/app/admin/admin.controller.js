angular.module('app')

.controller('AdminCtrl', ['$auth', '$scope', '$rootScope', '$state', 'Auth', function($auth, $scope, $rootScope, $state, Auth){
  $rootScope.$on('$stateChangeStart',function(e, toState){
    $scope.adminActive = toState.name;
  })
  $scope.logout = function(){
    $auth.logout();
    $state.go('public.login');
  }

  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  }

}])