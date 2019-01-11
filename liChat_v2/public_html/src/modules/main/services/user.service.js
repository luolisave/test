/**
* @Author: Li Luo
* @Date:   2016-11-04T11:01:00-04:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-15T10:48:19-05:00
*/

"use strict";

liApp.factory(
    'UserService',
    [
        '$q','$http','alertify',
        function UserService($q, $http, alertify) {
            var service = {};

            service.saveUserSettings = function(item2save){
                localStorage.setItem('userSettings', JSON.stringify(item2save));
                return true;
            }

            service.loadUserSettings = function(){
                var item2save = localStorage.getItem('userSettings');
                item2save = JSON.parse(item2save);
                return item2save;
            }


            return service;
        }
    ]
);
