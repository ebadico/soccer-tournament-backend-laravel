angular
  .module('app')

  .service('Media', function($http){
    this.createVideo = function(video){
      return $http.post('/api/video', video) 
    }

    this.delete = function(media){
      return $http.delete('/api/media/' + media.id);
    }

    this.get = function(){
      return $http.get('/api/media');
    }

    this.getPhotos = function(){
      return $http.get('/api/media?type=photo');  
    }
    this.getVideos = function(){
      return $http.get('/api/media?type=video');
    }
  })