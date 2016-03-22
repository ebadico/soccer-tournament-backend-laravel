angular
  .module('app')

  .controller('MediaCtrl', ['$scope', '$auth', '$sce', 'toastr', 'Media', function($scope, $auth, $sce, toastr, Media){
      $scope.upload = {};
  
      $scope.videos = [];
      $scope.photos = [];
  
      getPhotos();
      getVideos();
      getSponsors();
  
      $scope.createVideo = function(video){
        Media.createVideo(video)
        .then(function(res){
          toastr.success('Video aggiunto!');
          getVideos();
        }, function(err){
          toastr.error('Impossibile aggiungere il video', 'Error...');
        });
      }
  
      $scope.uploadPhotoSucces = function(){
        toastr.success('Photo Uploaded!');
        getPhotos();
      }

      $scope.uploadPhotoError = function( $file, $message, $flow ){
        console.log("media.controller.js :30", $message);
      }

      $scope.uploadSponsorSucces = function(){
        toastr.success('Photo Uploaded!');
        getSponsors();
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

      $scope.update = function(sponsor){
        Media
          .update(sponsor)
          .then(function(res){
            console.log("media.controller.js :54", res);
          },function(err){
            console.log("media.controller.js :56", err);
          })
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
      function getSponsors(){
        Media
          .getSponsors()
          .then(function(data){
            $scope.sponsors = data.data;
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