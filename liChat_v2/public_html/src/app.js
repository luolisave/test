/**
* @Author: Li Luo
* @Date:   2016-12-14T15:20:38-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-15T10:44:57-05:00
*/



var liApp = angular.module('liApp',[
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ui.router',
        'pascalprecht.translate',
        'ngAlertify'
    ]);

liApp.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider',
    function($routeProvider, $stateProvider, $urlRouterProvider, $translateProvider){

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        // sanitize: sanitizes HTML in the translation text using $sanitize
        // escape: escapes HTML in the translation
        // sanitizeParameters: sanitizes HTML in the values of the interpolation parameters using $sanitize
        // escapeParameters: escapes HTML in the values of the interpolation parameters


        $stateProvider
            .state(
                'main',
                {
                    url:         '/main',
                    templateUrl: 'src/modules/main/templates/body.html',
                    controller:  'bodyController'
                }
            )
            .state(
                'main.home',
                {
                    url:         '/home',
                    templateUrl: 'src/modules/main/templates/home/home.html',
                    controller:  'mainHomeController'
                }
            )
            .state(
                'main.note',
                {
                    url:         '/note',
                    templateUrl: 'src/modules/main/templates/note/note.html',
                    controller:  'mainNoteController'
                }
            )
            .state(
                'main.chat',
                {
                    url:         '/chat',
                    templateUrl: 'src/modules/main/templates/chat/chat.html',
                    controller:  'mainChatController'
                }
            )
            .state(
                'main.settings',
                {
                    url:         '/settings',
                    templateUrl: 'src/modules/main/templates/settings/settings.html',
                    controller:  'mainSettingsController'
                }
            )
        ;
        $urlRouterProvider.otherwise('/main/home');
    }
]);

liApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
