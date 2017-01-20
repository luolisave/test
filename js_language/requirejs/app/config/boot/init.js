/**
 * Created by martellojones on 2015-06-25.
 */
var myApp;
var $R = {
    registedStates : []
};
(function () {
    // configure RequireJS and then begin our boostrapping logic
    requirejs.config({
        //By default load any module IDs from config/lib
        baseUrl: './',
        paths:   {
        }
    });
    
        
    //myApp ======================================================
    myApp = angular.module('ca.lluo.requirejstry', ['ui.router', "oc.lazyLoad"]); //TODO: add ng-route
    
    // dynamic add state service 
    // http://stackoverflow.com/questions/25866387/angular-ui-router-programmatically-add-states
    // config-time dependencies can be injected here at .provider() declaration
    myApp.provider('RuntimeStatesService', function runtimeStates($stateProvider) {
      // runtime dependencies for the service can be injected here, at the provider.$get() function.
      this.$get = function($q, $timeout, $state) { // for example
        return { 
          addState: function(name, state) { 
            if(_.indexOf($R.registedStates, name) === -1){
                $R.registedStates.push(name);
                $stateProvider.state(name, state);
            }else{
                console.log("Duplicat $R.registedStates =", $R.registedStates);
            }
            
          }
        }
      }
    });
    
    //oc lazyload
    myApp.controller("Home3Controller", function($ocLazyLoad) {
      $ocLazyLoad.load('modules/home/index/controllers/home3controller.js');
    });
    
    //BodyController ======================================================
    myApp.controller('BodyController', ['$scope', 'RuntimeStatesService',  function ($scope, RuntimeStatesService) {
        $scope.greetMe = 'World';
        
        $scope.testClick = function(){
            RuntimeStatesService.addState('home3', {
              url: "/home3",
              templateUrl: "modules/home/index/views/state3.html",
              controller: "Home3Controller"
            });
        };
        
        $scope.testAppClick = function(){
            console.log("myApp",myApp);
        };
      }]);
    
    // ui-router
    // https://github.com/angular-ui/ui-router
    // https://angular-ui.github.io/ui-router/
    // https://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref-active
    myApp.config(
        function($stateProvider, $urlRouterProvider) {
          //
          // For any unmatched url, redirect to /state1
          $urlRouterProvider.otherwise("/home");
          //
          // Now set up the states
          $stateProvider
            .state('home', {
              url: "/home",
              templateUrl: "modules/home/index/views/state1.html"
            })
            .state('home2', {
              url: "/home2",
              templateUrl: "modules/home/index/views/state2.html"
            })
            ;
        });
    //===================================================================
    
    
    
    

    // bootstrap
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['ca.lluo.requirejstry']);
    });
})();




//requirejs(["helper/util"], function(util) {
//    console.log("abc");
//});
console.log("init.js file has been loaded.");