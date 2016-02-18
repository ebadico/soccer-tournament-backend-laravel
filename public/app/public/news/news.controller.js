angular.module('app')

.controller('PublicNewsCtrl', ['$scope', '$stateParams', 'News', function($scope, $stateParams, News){
  $scope.news = [];
  $scope.newsType = $stateParams.type || undefined;

  getNews();

  function getNews(){
    News
      .index()
      .then(function(res){
        $scope.news = res.data;
      });
  }

}])