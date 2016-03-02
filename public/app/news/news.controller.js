angular
  .module('app')

.controller('NewsCtrl', ['$rootScope', '$scope', '$state', 'toastr', 'News', 'Season', function($rootScope, $scope, $state, toastr, News, Season){
  $scope.postType = undefined;
  $scope.posts = [];
  $scope.post = {};

  getPosts();

  $scope.submit = function($files, $event, $flow) {
    $scope.uploadingBlock = true;
    $flow.opts.target = '/api/media?type=featured';
    $flow.upload();
  }
  $scope.uploaded = function ( $file, $message, $flow ){
    console.log("news.controller.js :16", $flow.files);
    if($message){
      var dbRecord = JSON.parse($message);
      $scope.post.featured_id = dbRecord.id;
      $scope.post.featured = {
        path: dbRecord.path
      }
    }
    toastr.success('Immagine di copertina aggiunta!');
    $scope.uploadingBlock = false;
    // $scope.editMode = !$scope.editMode;
    // getPosts();
  }

  $scope.create = function(post){
    News
      .create(post)
      .then(function(res){
        console.log("news.controller.js :30", res);
        if(res.status === 200){
          toastr.success('Post ' + (post.id ? 'modificato' : 'creato') , 'Success!');
          $scope.editMode = false;
          getPosts();
          $scope.post = {};
        }
      }, function(err){
        console.log("news.controller.js :38", err);
      });
  }

  $scope.delete = function(post){
   if(confirm('Sicuro di volerlo cancellare?')){
     News
      .delete(post) 
      .then(function(res){
        console.log("news.controller.js :26", res);
        if(res.status == 200){
          toastr.warning('Post cancellato!');
          getPosts();
        }
      }, function(err){
        console.log("news.controller.js :53", err);
      });
   }
  }

  Season
    .get()
    .then(function(res){
      $scope.seasons = res.data;
    });

  function getPosts(){
    News
      .index($scope.postType)
      .then(function(res){
        $scope.posts = res.data;
      });
  }

}])