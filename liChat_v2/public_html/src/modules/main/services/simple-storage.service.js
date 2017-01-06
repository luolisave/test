/**
* @Author: Li Luo
* @Date:   2016-12-15T10:48:36-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2017-01-05T22:03:36-05:00
*/



"use strict";

liApp.factory(
    'SimpleStorageService',
    [
        '$q','$http','alertify',
        function($q, $http, alertify) {
            var service = {};
            service.getNote = function(hash, passcode){
                    var apiUrl = 'http://api.lluo.ca/storage/s3/?passcode='+passcode+'&username=kbt&hash='+hash+'&stype=sqlite&ctype=';
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

            service.setNote = function(hash, passcode, data){
                    var apiUrl = "http://api.lluo.ca/storage/s3/?passcode="+passcode+"&username=kbt&hash="+hash+"&stype=sqlite&ctype=";
                    var defer = $q.defer();
                    $http.post(apiUrl, data).then(
                        function (response) {
                            defer.resolve(response.data);
                        },
                        function (errResponse) {
                            defer.reject(errResponse);
                        }
                    );
                    return defer.promise;
            };

            service.getDefaultItem = function(){
                    var apiUrl = "http://api.lluo.ca/storage/s3/?passcode=pass1234&username=kbt&hash=lisexpress_note_default&stype=sqlite&ctype=";
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

            service.setDefaultItem = function(data){
                    var apiUrl = "http://api.lluo.ca/storage/s3/?passcode=pass1234&username=kbt&hash=lisexpress_note_default&stype=sqlite&ctype=";
                    var defer = $q.defer();
                    $http.post(apiUrl, data).then(
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
