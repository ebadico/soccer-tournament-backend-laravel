angular.module('app')

.controller('PublicMediasCtrl', ['$scope','$stateParams', 'Media', function($scope, $stateParams, Media){
  $scope.media = [];
  $scope.type = $stateParams.type;

  if($stateParams.type == 'photo'){
    getPhotos();
  }else{
    getVideos();
  }


  function getPhotos (){
    Media
      .getPhotos()
      .then(function(res){
        $scope.media = res.data;
        $scope.loading = true;
      });
  }

  function getVideos (){
    Media
      .getVideos()
      .then(function(res){
        console.log("medias.controller.js :25", res);
        $scope.media = res.data;
        $scope.loading = true;
      });
  }

}])