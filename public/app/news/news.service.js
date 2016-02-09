angular.module('app')

.service('News', ['$http', function($http){
    
    this.create = function(post){
      return $http.post('/api/news', post);
    }

    this.index = function(type){
      if(type){
        return $http.get('/api/news?type=' + type);
      }
      return $http.get('/api/news');
    }

    this.delete = function(post){
      return $http.delete('/api/news/' + post.id);
    }


  }])