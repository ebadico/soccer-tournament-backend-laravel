angular
.module('app')
.controller('HomeCtrl', ['$scope', 'Round', 'News', 'Media', 'Day', function($scope, Round, News, Media, Day){
 
  $scope.slickConfig = {
      enabled: true,
      autoplay: true,
      draggable: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplaySpeed: 3500,
      responsive: [{
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          autoplaySpeed: 3500,
        }
      },{
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplaySpeed: 3500,
        }
      },{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplaySpeed: 3500,
        }
      },{
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplaySpeed: 2500,
        }
      },{
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 1500,
        }
      }],
      event: {
          beforeChange: function (event, slick, currentSlide, nextSlide) {
          },
          afterChange: function (event, slick, currentSlide, nextSlide) {
          }
      }
  };


  News.index('news')
  .then(function(res){
    $scope.news = res.data;
  }, function(err){
    console.log("home.controller.js :9", err);
  });

  Media.getSponsors()
  .then(function(res){
    $scope.sponsors = res.data;
    $scope.sponsorLoaded = true;
  }, function(err){
    console.log("home.controller.js :16", err);
  });

  Media.getPhotos()
  .then(function(res){
    console.log("home.controller.js :21", res.data);
    $scope.photos = res.data;
  }, function(err){
    console.log("home.controller.js :23", err);
  });

  // Round.get()
  // .then(function(res){
  //   $scope.rounds = res.data;
  // });

  Day.last()
  .then(function(res){
    console.log("home.controller.js :35", res.data);
    $scope.days = res.data;
  }, function(err){
    console.log("home.controller.js :38", err);
  });

}])