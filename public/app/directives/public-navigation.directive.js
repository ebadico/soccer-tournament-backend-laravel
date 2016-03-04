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

      $('#navigation-container').click(function(e){
        if ( $(e.target).parent().hasClass('dropdown') && $('#navigation-container').attr('data-mobile') === 'true' ) return;
        $('.navbar-toggle').trigger('click');
      });

      
      if( $(window).width() <= 1090 ){
        $('#navigation-container').attr('data-mobile','true');
      }else{
        $('#navigation-container').attr('data-mobile','false');
      }

      var $collapse = $('#navigation-container');
      $('.navbar-toggle').click(function(e){
        if ( $(this).attr('data-open') === 'true'){
          $collapse.css('height','0px');
          $(this).attr('data-open', 'false');
          $('#navigation-container').attr('data-open', 'false');
        }else{
          $collapse.css('height','350px');
          $(this).attr('data-open', 'true');
          $('#navigation-container').attr('data-open', 'true');
        }
      });

      $(document).ready(handler);
      $(window).scroll(handler);      

    },
    controller: function($scope){
      // $scope.rounds = [];
      // Round
      //   .get()
      //   .then(function(res){
      //     $scope.rounds = res.data;
      //   });
    }
  };
}])
