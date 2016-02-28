angular
  .module('app')

.controller('PrizeCtrl', ['$rootScope', '$scope', 'toastr', 'Season', 'Prize', function($rootScope, $scope, toastr, Season, Prize){
  $scope.prizes = [];
  $scope.seasons = [];
  $scope.prize = {};

  getSeasons();
  getPrizes();

  $scope.create = function(prize){
    Prize.create(prize)
    .then(function(data){
      $scope.prize = {};
      getPrizes();
      toastr.success('Premio salvato!');
    },function(err){
      toastr.error(err, 'Error...');
      console.log("prize.controller.js :20", err);
    });
  }

  $scope.delete = function(prize){
    if(confirm('Sicuro di volerlo rimuovere?')){
      Prize.delete(prize)
      .then(function(res){
        getPrizes();
        toastr.warning('Premio rimosso!');
        console.log("prize.controller.js :30", res);
      },function(err){
        toastr.error(err, 'Error...');
        console.log("prize.controller.js :20", err);
      });
    }
  }

  $scope.submit = function($files, $event, $flow) {
    $flow.opts.target = '/api/media?type=prize';
    $flow.upload();
  }
  $scope.uploaded = function ( $file, $message, $flow, prize){
    $img = JSON.parse($message);
    prize.media_id = $img.id;
    $scope.create(prize);
    toastr.success('Immagine di copertina aggiunta!');
  }

  function getPrizes(){
    Prize.get()
    .then(function(res){
      $scope.prizes = res.data;
    });
  }
  function getSeasons(){
    Season.get()
    .then(function(res){
      $scope.seasons = res.data;
    }, function(err){
      console.log("prize.controller.js :16", err);
    });
  }
}])
