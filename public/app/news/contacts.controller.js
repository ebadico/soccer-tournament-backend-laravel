angular
  .module('app')

.controller('ContactsCtrl', ['$scope', 'toastr', 'News', function($scope, toastr, News){
  $scope.rules = {};

  getContacts();

  $scope.create = function(contacts){
    contacts.title = 'contacts';
    contacts.type = 'contacts';
    News
      .create(contacts)
      .then(function(res){
        console.log("contacts.controller.js :13", res);
        if(res.status === 200){
          toastr.success('Contatti ' + (contacts.id ? 'modificati' : 'creati') , 'Success!');
        }
      }, function(err){
        console.log("news.controller.js :38", err);
      });
  }


  function getContacts(){
    News
      .index('contacts')
      .then(function(res){
        console.log("contacts.controller.js :27", res.data);
        $scope.contacts = res.data[0];
      }, function(err){
        console.log("contacts.controller.js :30", err);
      });
  }

}])