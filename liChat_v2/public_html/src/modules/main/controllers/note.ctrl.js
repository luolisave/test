/**
* @Author: Li Luo
* @Date:   2016-11-07T15:52:16-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2017-01-05T21:20:25-05:00
*/



/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'mainNoteController',
    ['$scope', '$rootScope', 'alertify', 'UserService', 'SimpleStorageService',
        function ($scope, $rootScope, alertify, UserService, SimpleStorageService) {
          // ====================================================================================================== sop
          $scope.saveNote = function(){
              SimpleStorageService
                .setNote("lisexpress_note_default", {"title":"aa","content":"bb"})
                .then(
                    function(rs){
                          if(!rs.status || rs.status === 0){
                              alertify.error("error: "+rs.info);
                          }else{
                              alertify.success("saved");
                          }
                    }
                );
          };

          $scope.init = function(){

              SimpleStorageService.getNote("lisexpress_note_default").then(function(rs){
                  console.log("getNote rs=",rs);
                  $scope.note = rs.data;
              });
          };

          $scope.init();

           //*/
           // ====================================================================================================== EOP
        }
    ]
);
