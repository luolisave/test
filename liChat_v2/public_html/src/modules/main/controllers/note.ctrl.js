/**
* @Author: Li Luo
* @Date:   2016-11-07T15:52:16-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-11-07T16:50:08-05:00
*/



/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'mainNoteController',
    ['$scope', '$rootScope', 'alertify', 'UserService',
        function ($scope, $rootScope, alertify, UserService) {
          // ====================================================================================================== sop
          function LiNote(){
              var self = this;
              self.item = {};
              self.click = {
                  saveNote: function(){

                      var currentUrl = "";
                      if(chrome && chrome.tabs && chrome.tabs.getSelected){
                          chrome.tabs.getSelected(null,function(tab) {
                              var tabUrl = tab.url;
                              var tabUrlHash = hex_md5(tabUrl);

                              UserService.setNote(tabUrlHash, $rootScope.userInfo.email, $scope.liNote.item).then(
                                function(data){
                                    //alertify.success('Note saved Successfully!  hash:'+tabUrlHash + "  email : " + $rootScope.userInfo.email);
                                    alertify.success('Note saved Successfully!');
                                }
                              );
                          });
                      }else{
                        // ============= for test on localhost only ========
                          var tabUrl = "chrome://extensions/"; //assumes the current url is this one.
                          var tabUrlHash = hex_md5(tabUrl);

                          if(!$scope.liNote.item){$scope.liNote.item = {}}

                          UserService.setNote(tabUrlHash, $rootScope.userInfo.email, $scope.liNote.item).then(
                            function(data){
                                alertify.success('Note saved Successfully! ');
                            }
                          );
                        //============= test ends =============
                          alertify.error('not in extension');
                      }
                  }
              };
              self.init = function(){
                var currentUrl = "";
                if(chrome && chrome.tabs && chrome.tabs.getSelected){
                    chrome.tabs.getSelected(null,function(tab) {
                        var tabUrl = tab.url;


                        //alertify.success('tab url : ' + tabUrl + $scope.liNote.item.meta);

                        var tabUrlHash = hex_md5(tabUrl);
                        //alertify.success('tabUrlHash : ' + tabUrlHash);
                        //alertify.success('$rootScope.userInfo.email : ' + $rootScope.userInfo.email);

                        UserService.getGoogleUserInfo().then(function(userInfo){
                            UserService.getNote(tabUrlHash, userInfo.email).then(
                              function(data){
                                  //alertify.success('data : ' + JSON.stringify(data));
								                  alertify.success('data retrived. ');
                                  self.item = data.data;
                                  self.item.meta = tabUrl;
                              }
                            );
                        });


                    });
                }else{
                  // ============= for test on localhost only ========
                  var tabUrl = "chrome://extensions/"; //assumes the current url is this one.
                  //alertify.success('tab url : ' + tabUrl);

                  var tabUrlHash = hex_md5(tabUrl);
                  //alertify.success('tabUrlHash : ' + tabUrlHash);
                  //alertify.success('$rootScope.userInfo.email : ' + $rootScope.userInfo.email);

                  UserService.getGoogleUserInfo().then(function(userInfo){
                      UserService.getNote(tabUrlHash, userInfo.email).then(
                        function(data){
                            $scope.liNote.item = data.data;
                        }
                      );
                  });

                  //=============== test ends ===============
                    alertify.error('not in extension');
                }

              };
              self.init();
          }


          $scope.clickSave = function(){

          };

          $scope.init = function(){
            $scope.liNote = new LiNote();
          };

          $scope.init();

           //*/
           // ====================================================================================================== EOP
        }
    ]
);
