var app = angular.module('wmud', ['ngRoute', 'ngCookies', 'ngResource']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);

		$routeProvider
		
		//login and logout
		
		
		
		//
		.when('/', 			{templateUrl: 'partials/index/index.html',controller: 'IndexCtrl'})
		
		// test and/or error page
		.when('/test', {templateUrl: 'partials/test.html',controller: 'TestCtrl'})
		.when('/unittest', {templateUrl: 'partials/unittest.html',controller: 'UnittestCtrl'})
		.when('/demo', {template: '<h3>DEMO</h3>'})
		.when('/404', {template: '<h3>Page not found!</h3>'})
		.otherwise({redirectTo: '/404'});

    }
]);


// Global Variable (config)
function getApiBaseUrl(){
    var url = window.location.href;
	var arr = url.split("/");
	var httpx = arr[0];
	var domain = arr[2];
	var base_url = httpx + "//" + domain + "/wmud/index.php";
	return base_url;
}
var API_BASE_URL = getApiBaseUrl();
/////console.log(API_BASE_URL);


/*
angular.module('myApp.config', [])
    .constant('APP_NAME','My Angular App!')
    .constant('APP_VERSION','0.3');

angular.module('myApp.controllers', ['myApp.config'])
  .controller('ListCtrl', ['$scope', 'APP_NAME', function($scope, appName) {
     $scope.printme = appName;
}]);
//*/