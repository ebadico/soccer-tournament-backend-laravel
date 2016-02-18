angular.module('app')

.controller('PublicMediasCtrl', ['$scope','$stateParams', 'Media', function($scope, $stateParams, Media){
  $scope.media = [];
  $scope.mediaType = $stateParams.type;

  getMedia();

  function getMedia (){
    Media
      .get()
      .then(function(res){
        $scope.media = res.data;
      });
  }

}])