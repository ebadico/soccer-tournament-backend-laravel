angular.module('app')
.directive('publicNavigation', function(){
  return function(scope, element){
    var handler = function(){
      var landingHeight = $('body').find('.landing-container').height();
      if ($(this).scrollTop() > landingHeight - 25 ){
          $(element).addClass('nav-dark');
      }else{
          $(element).removeClass('nav-dark');
      }

    }

    $(document).ready(handler);
    $(window).scroll(handler);
    $(window).scroll(function(){
     if($(element).find('.navbar-collapse').hasClass('in')){
      $('body').find('.navbar-toggle').trigger('click');
     }
    })

  };
})