angular
  .module('app')

  .service('Media', ['$http', function($http){
      this.createVideo = function(video){
        return $http.post('/api/video', video) 
      }
  
      this.delete = function(media){
        return $http.delete('/api/media/' + media.id);
      }

      this.update = function(sponsor){
        return $http.put('/api/media/' + sponsor.id, sponsor);
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
      this.getSponsors = function(){
        return $http.get('/api/media?type=sponsor');
      }
      
    }])