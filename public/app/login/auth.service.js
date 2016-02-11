angular.module('app')

.service('Auth', ['$http','$rootScope',function($http, $rootScope){
  this.login = function(credential){
    return $http.post('/api/auth', credential);
  }

  this.check = function(){
    return $http.get('/api/auth/check');
  }  
}])