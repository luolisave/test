/**
* @Author: Li Luo
* @Date:   2016-12-15T10:48:36-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-15T10:54:20-05:00
*/



"use strict";

liApp.factory(
    'IotService',
    [
        '$q','$http','alertify',
        function UserService($q, $http, alertify) {
            var service = {};
            service.getAm2320 = function(){
                    var apiUrl = "http://api.lluo.ca/storage/s3/?passcode=pass1234&username=luolisave@gmail.com&hash=am2320_nodemcu&stype=simple_store&ctype=&getmsg=true";
                    var defer = $q.defer();
                    $http.get(apiUrl).then(
                        function (response) {
                            defer.resolve(response.data);
                        },
                        function (errResponse) {
                            defer.reject(errResponse);
                        }
                    );
                    return defer.promise;
            };



            return service;
        }
    ]
);
