/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'bodyController',
    ['$scope','$rootScope', 'alertify', "UserService",
        function($scope, $rootScope, alertify, UserService) {
            // if(chrome && chrome.identity && chrome.identity.getProfileUserInfo){
            //     chrome.identity.getProfileUserInfo(function(userInfo) {
            //           $rootScope.userInfo = userInfo;
            //           //alertify.success('email = ' + userInfo.email + "    id =" + userInfo.id);
            //     });
            // }else{
            //     alertify.error("not run under chrome extension mode.");
            // }
            UserService.getGoogleUserInfo().then(function(userInfo){
                  $rootScope.userInfo = userInfo;
                  //alertify.success('email = ' + userInfo.email + "    id =" + userInfo.id);
            });
        }
    ]
);
