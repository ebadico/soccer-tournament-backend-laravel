angular
  .module('app')

.controller('RulesCtrl', ['$scope', 'toastr', 'News', function($scope, toastr, News){
  $scope.rules = {};

  getRules();

  $scope.create = function(rules){
    rules.type = 'rules';
    News
      .create(rules)
      .then(function(res){
        console.log("rules.controller.js :13", res);
        if(res.status === 200){
          toastr.success('Regole ' + (rules.id ? 'modificate' : 'create') , 'Success!');
        }
      }, function(err){
        console.log("news.controller.js :38", err);
      });
  }


  function getRules(){
    News
      .index('rules')
      .then(function(res){
        console.log("rules.controller.js :27", res.data);
        $scope.rules = res.data[0];
      }, function(err){
        console.log("rules.controller.js :30", err);
      });
  }

}])