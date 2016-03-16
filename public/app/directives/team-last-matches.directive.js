angular.module('app')

.directive('lastMatches', ['Match', function(Match){
  return {
    restrict: 'E',
    templateUrl: 'app/directives/templates/team-last-matches.html',
    scope: {
      'matches': '='
    },
    controller: function($scope){
      $scope.latestMatches = [];
      $scope.$watch('matches',function(newVal, oldVal){
        if(newVal && newVal != oldVal) fetchMatchesData();
      }, true);

      function fetchMatchesData(){
        $scope.matches.forEach( function(match, index) {
          Match.single(match.id)
          .then(function(res){
            var match = sortScores(res.data);
            $scope.latestMatches.push(match);
          }, function(err){
            console.log("team-last-matches.directive.js :22", err);
          })
        });
      }
      function sortScores(match){
        match.team_a.scores = [];
        match.team_b.scores = [];
        match.scores.forEach( function(score, index) {
          if(score.team_id === match.team_a.id) {
            match.team_a.scores.push(score);
          }else{
            match.team_b.scores.push(score);
          }
        });
        console.log("team-last-matches.directive.js :37", match);
        return match;
      }

    }
  };

}]);