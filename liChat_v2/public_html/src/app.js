/**
* @Author: Li Luo
* @Date:   2016-12-14T15:20:38-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2017-01-05T22:14:59-05:00
*/



var liApp = angular.module('liApp',[
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ui.router',
        'pascalprecht.translate',
        'ngAlertify',
        'ui.tinymce'
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
                    url:         '/note/:noteHash',
                    templateUrl: 'src/modules/main/templates/note/note.html',
                    controller:  'mainNoteController'
                }
            )
            .state(
                'main.noteplus',
                {
                    url:         '/noteplus/:noteHash',
                    templateUrl: 'src/modules/main/templates/note/noteplus.html',
                    controller:  'mainNotePlusController'
                }
            )
            .state(
                'main.bookmark',
                {
                    url:         '/bookmark',
                    templateUrl: 'src/modules/main/templates/bookmark/bookmark.html',
                    controller:  'bookmarkController'
                }
            )
            .state(
                'main.bookmark.page',
                {
                    url:         '/page/:noteHash',
                    templateUrl: 'src/modules/main/templates/bookmark/bookmark_page.html',
                    controller:  'bookmarkPageController'
                }
            )
            .state(
                'main.thread',
                {
                    url:         '/thread/:noteHash',
                    templateUrl: 'src/modules/main/templates/thread/thread.html',
                    controller:  'mainThreadController'
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
