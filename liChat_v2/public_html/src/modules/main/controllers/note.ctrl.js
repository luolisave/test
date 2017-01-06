/**
* @Author: Li Luo
* @Date:   2016-11-07T15:52:16-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2017-01-05T22:19:55-05:00
*/



/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'mainNoteController',
    ['$scope', '$rootScope', '$stateParams', 'alertify', 'UserService', 'SimpleStorageService',
        function ($scope, $rootScope, $stateParams, alertify, UserService, SimpleStorageService) {
          // ====================================================================================================== sop
          $scope.params = $stateParams; //$scope.params.noteHash

          $scope.saveNote = function(){
              SimpleStorageService
                .setNote($scope.params.noteHash,"pass1234", $scope.note)
                .then(
                    function(rs){
                        console.log("rs", rs);
                          if(!rs.status || rs.status === 0){
                              alertify.error("error: "+rs.info);
                          }else{
                              alertify.success("saved");
                          }
                    }
                );
          };

          $scope.init = function(){

              SimpleStorageService.getNote($scope.params.noteHash, "pass1234").then(function(rs){
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
