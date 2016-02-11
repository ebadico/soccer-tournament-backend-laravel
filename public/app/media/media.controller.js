angular
  .module('app')

  .controller('MediaCtrl', ['$scope', '$auth', '$sce', 'toastr', 'Media', function($scope, $auth, $sce, toastr, Media){
      $scope.upload = {};
  
      $scope.videos = [];
      $scope.photos = [];
  
      getPhotos();
      getVideos();
  
      $scope.createVideo = function(video){
        Media.createVideo(video)
        .then(function(res){
          toastr.success('Video aggiunto!');
          getVideos();
        }, function(err){
          toastr.error('Impossibile aggiungere il video', 'Error...');
        });
      }
  
      $scope.uploadSucces = function(){
        toastr.success('Photo Uploaded!');
        getPhotos();
      }
  
      $scope.delete = function(media){
        if(confirm("Sicuro di volerlo rimuovere?")){
          Media
            .delete(media)
            .then(function(res){
              toastr.warning('Media rimosso!');
              getVideos();
              getPhotos();
            });
        }
      }
  
  
      function getMedias(){
        Media
          .get()
          .then(function(data){
            $scope.medias = data.data;
          }, function(err){
            console.log("media.controller.js :30", err);
          });
      }
      function getVideos(){
        Media
          .getVideos()
          .then(function(data){
            $scope.videos = data.data;
          }, function(err){
            console.log("media.controller.js :39", err);
          });
      }
      function getPhotos(){
        Media
          .getPhotos()
          .then(function(data){
            $scope.photos = data.data;
          }, function(err){
            console.log("media.controller.js :48", err);
          });
      }
  
  
    }])