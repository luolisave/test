/**
* @Author: Li Luo
* @Date:   2016-11-07T15:52:16-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2017-01-18T16:06:36-05:00
*/

"use strict";

liApp.controller(
    'mainThreadController',
    ['$scope', '$rootScope', '$stateParams', 'alertify', 'UserService', 'SimpleStorageService',
        function ($scope, $rootScope, $stateParams, alertify, UserService, SimpleStorageService) {
          // ====================================================================================================== sop
          $scope.params = $stateParams; //$scope.params.noteHash

            $scope.note = {};
            $scope.note.threads = [];
            $scope.thread = {};
            $scope.flagTextareaEdit = false;
            $scope.EnableTextareaEdit = function(){
                $scope.flagTextareaEdit = !$scope.flagTextareaEdit;
            };

          $scope.saveNote = function(){
              SimpleStorageService
                .setNote("th_"+$scope.params.noteHash,"pass1234", $scope.note)
                .then(
                    function(rs){
                        console.log("rs", rs);
                          if(!rs.status || rs.status === 0){
                              alertify.error("error: "+rs.info);
                          }else{
                              alertify.success("saved");
                              $scope.flagTextareaEdit = false;
                              $scope.flagReply = false;
                              $scope.thread = {
                                  "nickname": $scope.thread.nickname
                              }
                          }
                    }
                );
          };

            $scope.saveThreads = function(){
                console.log("thread", $scope.thread);
                if($scope.thread.nickname && $scope.thread.nickname != "" && $scope.thread.content && $scope.thread.content != ""){
                    //add time stamp
                    var offset = new Date().getTimezoneOffset();
                    offset = offset /60*-1;
                    $scope.thread.datetime = moment().format('YYYY-MM-DD hh:mm:ss') + " (GTM"+ offset +")";

                    $scope.note.threads.push(angular.copy($scope.thread));
                    $scope.saveNote();
                }else{
                    alertify.error("Please enter name and content.");
                }

            };

            $scope.clearNote = function(){
                var r = confirm("Clear Note?");
                if (r == true) {
                    $scope.note.title = "";
                    $scope.note.content = "";
                    $scope.note.threads = [];
                    $scope.saveNote();
                } else {
                    //do nothing
                }

            };

          $scope.init = function(){

              SimpleStorageService.getNote("th_"+$scope.params.noteHash, "pass1234").then(function(rs){
                  if(!rs.status || rs.status === 0){
                      alertify.error("error: "+rs.info);
                  }else{
                      alertify.success("retrived");
                      console.log("getNote rs=",rs);
                      $scope.note = rs.data;
                  }

              });
          };

          $scope.init();

           //*/
           // ====================================================================================================== EOP
        }
    ]
);
