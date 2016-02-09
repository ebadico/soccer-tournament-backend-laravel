angular
  .module('app')

  .controller('MediaCtrl', function($scope, Media){
    
    $scope.createVideo = function(video){
      Media.createVideo(video)
      .then(function(res){
        console.log("media.controller.js :8", res.data);
      })
    }


  })