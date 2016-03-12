angular
  .module('app')

  .filter('spaceless', function() {
    return function(input) {
      return input.replace(new RegExp(" ", 'g'), "_");
    };
  })

  /** FOR YOUTUBE LINKS */
  .filter('trustedUrl', ['$sce', function($sce) {
      return function(input) {
        return $sce.trustAsResourceUrl(input);
      };
    }])


  .filter('roundFilter', function(){
    return function(array, round_id){
      if(!round_id) return array;

      var filtered = array.filter(function(index) {
        return (index.round_id === round_id);
      });

      return filtered;

    };
  })

  .filter('dayRoundFilter', function(){
    return function(array, round_id){
      array = array || [];
      if(!round_id) return array;

      var filtered = array.filter(function(index) {
        return (index.round_id === round_id);
      });

      return filtered;

    };
  })

  .filter('playerRoundFilter', function(){
    return function(array, round_id){

      if(!round_id) return array;

      var filtered = array.filter(function(index) {
        return (index.team.round_id === round_id);
      });

      return filtered;

    };
  })

  .filter('orderByScores', function(){
    return function(array, scores){
      console.log("filters.js :47", "asdasd");
      return _.sortBy(array, function (item) { return item.scores.length });
    };
  })
