/**
* @Author: Li Luo
* @Date:   2016-11-04T11:01:00-04:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-11-07T15:53:31-05:00
*/

"use strict";

liApp.factory(
    'UserService',
    [
        '$q','$http','alertify',
        function UserService($q, $http, alertify) {
            var service = {};

            service.getDefaultSettings = function(){
                return {
                  "passcode":"pass1234",
                  "setUrl": "http://api.lluo.dev/storage/v3/",
                  "getUrl": "http://api.lluo.dev/storage/v3/"
                };
            }

            service.getDefaultUserInfo = function(){
                return {
                  "email":"test@lluo.ca",
                  "id":"1234567890"
                };
            }

            service.getGoogleUserInfo = function(){
                var defer = $q.defer();

                if(chrome && chrome.identity && chrome.identity.getProfileUserInfo){
                    chrome.identity.getProfileUserInfo(function(userInfo) {
                        if(userInfo.email){
                            defer.resolve(userInfo);
                        }else{
                            defer.reject(userInfo);
                        }
                    });
                }else{
                    defer.resolve(service.getDefaultUserInfo());
                }


                return defer.promise;

                if(chrome && chrome.identity && chrome.identity.getProfileUserInfo){
                    chrome.identity.getProfileUserInfo(function(userInfo) {
                          $rootScope.userInfo = userInfo;
                          //alertify.success('email = ' + userInfo.email + "    id =" + userInfo.id);
                    });
                }else{
                    alertify.error("not run under chrome extension mode.");
                }
            };

            service.getNote = function(hash, username){
                var defer = $q.defer();

                this.getUserSettings().then(function(rs){

                    //fall back to default setting if empty user setting in
                    if(!rs.getUrl || rs.getUrl === "" || !rs.passcode || rs.passcode === "" ){
                        rs = service.getDefaultSettings();
                        //alert('UserService.getNote: fall back to default setting if empty user setting in.');
                        alertify.error('UserService.getNote(): fall back to default setting if empty user setting in.');
                    }

                    $http.get(rs.getUrl+'?passcode='+rs.passcode+"&username="+username+'&hash='+hash).then(function(rs){
                        defer.resolve(rs.data);
                    },function(error){
                        defer.reject(error);
                    });
                },
                function(error){
                  defer.reject(error);
                });

                return defer.promise;
            };

            service.setNote = function(hash, username,  noteItem){
                var defer = $q.defer();

                this.getUserSettings().then(function(rs){
                    //fall back to default setting if empty user setting in
                    if(!rs.setUrl || rs.setUrl === "" || !rs.passcode || rs.passcode === "" ){
                        rs = service.getDefaultSettings();
                        //alert('UserService.setNote: fall back to default setting if empty user setting in.');
                        alertify.error('UserService.setNote(): fall back to default setting if empty user setting in.');
                    }

                  $http.post(rs.setUrl+'?passcode='+rs.passcode+'&username='+username+'&hash='+hash, noteItem).then(function(rs){
                      defer.resolve(rs.data);
                  },function(error){
                      defer.reject(error);
                  });
                },
                function(error){
                  defer.reject(error);
                });


                return defer.promise;
            };




            service.getUserSettings = function(){
                var defer = $q.defer();



                if(chrome && chrome.storage && chrome.storage.sync){
                  chrome.storage.sync.get('userSettings', function(r) {
                      if(r['userSettings']){
                        defer.resolve(r['userSettings']);
                      }else{
                        defer.resolve(service.getDefaultSettings());
                        //defer.reject({});
                      }
                  });
                }else{
                    defer.resolve(service.getDefaultSettings());
                }

                return defer.promise;

            };

            service.setUserSettings = function(settings){
                var defer = $q.defer();

                if(chrome && chrome.storage && chrome.storage.sync){
                    chrome.storage.sync.set({"userSettings":settings}, function() {
                        defer.resolve({"status":2,"info":"settings saved in sync."});
                    });
                }else{
                    defer.reject({"status":-2,"info":"settings failed to sync because not in extension."});
                }
                return defer.promise;

            };


            return service;
        }
    ]
);
