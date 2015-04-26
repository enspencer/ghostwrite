var angularWriter = angular.module('angularWriter', ['ngAnimate', 'templates', 'ngRoute']);

angularWriter.config(function ($routeProvider) {
	$routeProvider

  .when('/', {
	templateUrl: 'main.html', 
	controller: 'SliderController'
	})

  .when('/personal', {
  	templateUrl: 'personal.html',
  	controller: 'SliderController'
  })
});

angularWriter.controller('SliderController', function($scope) {
  $scope.phrases=[{
    phrase: 'choose'
  }, {
    phrase: 'choisir'
  }, {
    phrase: 'wählen'
  }, {
   	phrase: 'plocka'
  }, {
    phrase: ' चुनना'
  }];
});
 
angularWriter.directive('slider', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      phrases: '='
    },
       link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.phrases.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.phrases.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.phrases.forEach(function(phrase){
				phrase.visible=false;
			});
			scope.phrases[scope.currentIndex].visible=true;
		});
	  
	  var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},4000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
		
    },
  }
});








	 	
 //	};   	
