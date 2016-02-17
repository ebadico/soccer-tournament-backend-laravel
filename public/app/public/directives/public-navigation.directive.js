angular.module('app')
.directive('publicNavigation', function(){
  return function(scope, element){
    

    $(window).scroll(function(){
        var landingHeight = $('body').find('.landing-container').height();
        
        if ($(this).scrollTop() > landingHeight - 25 ){
            $(element).addClass('nav-dark');
        }else{
            $(element).removeClass('nav-dark');
        }
    });

  };
})