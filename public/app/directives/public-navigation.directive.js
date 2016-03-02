angular.module('app')
.directive('publicNavigation', [
  'Round',
  '$state',
  function(Round, $state) {
  return {
    link: function(scope, element){
      var handler = function(){
        var landingHeight = $('body').find('.landing-container').height() || false;
        if ($(this).scrollTop() > landingHeight - 25 ){
            $(element).addClass('nav-dark');
        }else{
            $(element).removeClass('nav-dark');
        }
        if(!landingHeight) $(element).addClass('nav-dark');
        
        if($state.current.name === 'public.login'){
          $(element).fadeOut();
        }else{
          $(element).fadeIn();
        }
        if($state.current.name != 'public.home'){
          $(element).addClass('nav-dark');
        }
      }

      $(document).ready(handler);
      $(window).scroll(handler);      
      $(window).scroll(function(){
       if($(element).find('.navbar-collapse').hasClass('in')){
        $('body').find('.navbar-toggle').trigger('click');
       }
      });



    },
    controller: function($scope){
      $scope.rounds = [];
      Round
        .get()
        .then(function(res){
          $scope.rounds = res.data;
        });
    }
  };
}])
