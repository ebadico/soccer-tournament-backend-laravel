angular.module('app')

.controller('PublicCalendarsCtrl', ['$scope', '$stateParams', 'Day', 'Round', function($scope, $stateParams, Day, Round){
  $scope.roundFilterId = $stateParams.round || undefined;
  
  $scope.days = [];
  $scope.rounds = [];

  getRounds();
  getDays();

  $scope.changeRound = function(round_id){
    $scope.round_id = round_id;
  }

  function getRounds (){
    Round.get()
    .then(function(res){
      $scope.rounds = res.data;
    }, function(err){
      console.log("calendars.controller.js :15", err);
    });
  }
  function getDays (){
    Day.get()
    .then(function(res){
      $scope.days = res.data;
    }, function(err){
      console.log("calendars.controller.js :23", err);
    });
  }

}])