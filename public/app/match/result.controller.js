angular
  .module('app')

  .controller('ResultCtrl', [ '$scope', '$state', '$stateParams', 'toastr', 'Match', function($scope, $state, $stateParams, toastr, Match){
      $scope.match = {};
  
      $scope.teamAScores = [];
      $scope.teamBScores = [];
  
      getMatch();
  
      $scope.edit = function(result){
        result.played = true;
        result.attendances = [];
  
        result.all_scores = $scope.teamAScores.concat($scope.teamBScores);
  
        Match
          .edit(result)
          .then(function(res){
            console.log("result.controller.js :25", res.data);
            getMatch();
            toastr.success('Risultato salvato!');
            //$scope.attendances = {};
          })
      }
      
      function getMatch(){
        Match
          .single($stateParams.match_id)
          .then(function(res){
            $scope.match = res.data;
  
            /** scores two way && attendance */
            $scope.match.team_a.player.forEach(function(player){
              player.score = 0;
              $scope.match.scores.forEach(function(score){
                if( score.player_id === player.id ) player.score++;
              });
  
              player.attendance.forEach(function(attend){
                if(attend.match_id === $scope.match.id ) player.attendance = true;
                else player.attendance = false;
              });

              player.warning.forEach(function(warning){
                if(warning.match_id === $scope.match.id ) player.penalty = 'warning';
              });

              player.expulsion.forEach(function(expulsion){
                if(expulsion.match_id === $scope.match.id ) player.penalty = 'expulsion';
              });

  
            });
            $scope.match.team_b.player.forEach(function(player){
              player.score = 0;
              $scope.match.scores.forEach(function(score){
                if( score.player_id === player.id ) player.score++;
              });
              player.attendance.forEach(function(attend){
                if(attend.match_id === $scope.match.id ) player.attendance = true;
                else player.attendance = false;
              });
              player.warning.forEach(function(warning){
                if(warning.match_id === $scope.match.id ) player.penalty = 'warning';
              });

              player.expulsion.forEach(function(expulsion){
                if(expulsion.match_id === $scope.match.id ) player.penalty = 'expulsion';
              });
            });
          });
  
      }
  
      $scope.$watch('match', function(newVal, oldVal){
        if( typeof newVal.id != 'undefined' ) {
          var match = newVal;
          var teamAScores = [];
          var teamBScores = [];
          match.team_a.player.forEach(function(player){
            if(player.score && player.score >= 0 ){
              player.player_id = player.id;
              player.match_id = $scope.match.id;
              for(var i = 0; i < player.score; i++) teamAScores.push(player);
            }
            $scope.teamAScores = teamAScores;
          });
          match.team_b.player.forEach(function(player){
            if(player.score && player.score >= 0 ){
              player.player_id = player.id;
              player.match_id = $scope.match.id;
              for(var i = 0; i < player.score; i++) teamBScores.push(player);
            }
            $scope.teamBScores = teamBScores;
          });
          if($scope.teamAScores.length === $scope.teamBScores.length ){
            $scope.match.winner_id = null;
          }
          if($scope.teamAScores.length > $scope.teamBScores.length ){
            $scope.match.winner_id = $scope.match.team_a.id;
          }
          if($scope.teamAScores.length < $scope.teamBScores.length ){
           $scope.match.winner_id = $scope.match.team_b.id; 
          }
  
        }
      },true);
  
  
    }])