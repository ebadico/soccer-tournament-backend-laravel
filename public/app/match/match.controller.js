angular
  .module('app')

  .controller('MatchCtrl', ['$scope', '$state', 'Match', 'Round', 'Day', 'Team', 'toastr', function($scope, $state, Match, Round, Day, Team, toastr){
      $scope.matches = [];
      $scope.match = {};
      
      $scope.rounds = [];
      $scope.round_id = "";
  
      $scope.teams  = [];
      
      $scope.days   = [];
      $scope.choosen_day_id = "";
      $scope.filters = {
        day_id: undefined,
        round_id: undefined,
      }
  
      $scope.$watch('filters',function(current, prev){
        console.log("match.controller.js :21", "changed");
        getDays();
        getMatchs();
      }, true);
  
      getRounds();
  
      $scope.getDataFromRound = function(round_id){
        Team.getFromRound(round_id)
        .then(function(res){
          $scope.teams = res.data;
        }, function(err){
          console.log("match.controller.js :37", err);
        });
      }
  
      $scope.create = function(match){
        Match.create(match)
        .then(function(res){
          $scope.match = {};
          toastr.success('Match creato!');
          console.log("match.controller.js :63", res);
          getMatchs();
        },function(err){
          console.log("match.controller.js :46", err);
        });
      }
  
      $scope.delete = function(match){
          if(confirm('Sicuro di volerlo rimuovere?')){
            Match.delete(match)
            .then(function(res){
              console.log("match.controller.js :30", res);
              toastr.warning('Rimosso!');
              getMatchs();
            }, function(err){
              toastr.error(err, 'Errore...');
              console.log("match.controller.js :32", err);
            })
          }
        }
      function getRounds(){
        Round
          .get()
          .then(function(res){
            $scope.rounds = res.data;
          });
      }
  
      function getMatchs(){
        Match.get()
        .then(function(res){
          $scope.matches = res.data;
        },function(err){
          console.log("match.controller.js :27", err);
        });
      }
  
      function getDays(){
        Day
          .getFromRound($scope.filters.round_id)
          .then(function(res){
            $scope.days = res.data;
          });
      }
  
      $scope.selectRound = function(round){
        $scope.selectedRound = round.id;
      }
  
    }])