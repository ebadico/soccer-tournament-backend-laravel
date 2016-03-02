angular.module('app')

.controller('PublicContactsCtrl', ['$scope', 'News', function($scope, News){
  $scope.contacts = {};
  getContacts();

  function getContacts(){
    News
    .index('contacts')
    .then(function(res){
      console.log("contacts.controller.js :11", res);
      $scope.contacts = res.data[0];
    }, function(err){
      console.log("contacts.controller.js :14", err);
    });
  }  
}])