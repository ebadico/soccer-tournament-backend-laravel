angular
  .module('app')

  .controller('NewsCtrl', ['$scope', 'toastr', 'News', 'Season', function($scope, toastr, News, Season){
      $scope.postType = undefined;
      $scope.posts = [];
      $scope.post = {};
  
      getPosts();
  
      $scope.create = function(post){
        News
          .create(post)
          .then(function(res){
            if(res.status === 200){
              toastr.success('Post creato!', 'Success!');
              $scope.editMode = false;
              getPosts();
            }
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