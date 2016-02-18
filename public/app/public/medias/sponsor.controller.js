angular.module('app')

.controller('PublicSponsorCtrl', ['$scope','Media', function($scope, Media){
  $scope.sponsors = [];

  getSponsors();

  function getSponsors (){
    Media
      .getSponsors()
      .then(function(res){
        $scope.sponsors = res.data;
      });
  }

}])