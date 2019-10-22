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
    'bookmarkController',
    ['$scope', '$rootScope', '$window', '$stateParams', 'alertify', 'UserService', 'SimpleStorageService',
        function ($scope, $rootScope, $window, $stateParams, alertify, UserService, SimpleStorageService) {
          // ====================================================================================================== sop
          $scope.params = $stateParams; //$scope.params.noteHash

          // init
          $scope.init = function(){
            //   SimpleStorageService.getNote("li_express_bookmark", "pass1234").then(function(rs){
            //       if(!rs.status || rs.status === 0){
            //           alertify.error("error: "+rs.info);
            //       }else{
            //           alertify.success("retrived");
            //           console.log("getBookmarkmenu rs=",rs);
            //           $scope.note = rs.data;
            //       }
            //   });
          };

          $scope.init();

           //*/
           // ====================================================================================================== EOP
        }
    ]
);
