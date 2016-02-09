angular
  .module('app')

  .service('Media', function($http){
    this.createVideo = function(video){
      return $http.post('/api/video', video) 
    }
  })