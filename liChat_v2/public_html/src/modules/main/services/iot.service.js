/**
* @Author: Li Luo
* @Date:   2016-12-15T10:48:36-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2017-01-05T20:08:17-05:00
*/



"use strict";

liApp.factory(
    'IotService', 
    [
        '$q','$http','alertify',
        function($q, $http, alertify) {
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
