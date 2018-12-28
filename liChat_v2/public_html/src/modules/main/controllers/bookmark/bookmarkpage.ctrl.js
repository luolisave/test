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
    'bookmarkPageController',
    ['$scope', '$rootScope', '$window', '$stateParams', 'alertify', 'UserService', 'SimpleStorageService',
        function ($scope, $rootScope, $window, $stateParams, alertify, UserService, SimpleStorageService) {
          // ====================================================================================================== sop
          $scope.params = $stateParams; //$scope.params.noteHash
          $rootScope.noteHash = $scope.params.noteHash;
          $scope.bookmarkTitle = "";
          $scope.bookmarkURL = "";

          $scope.saveBookmarks = function(){
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

          $scope.generateQRcode = function(index, url){
            new QRCode(document.getElementById("qrcode_"+index), url);
          }

          $scope.clearInnerHtml = function(index){
              jQuery("#qrcode_"+index).html('');
          }

          $scope.trunOnRemove = function(){
              $scope.flageRemoveBtn = true;
          }
          
          $scope.addBookmark = function(){
            if($scope.bookmarkURL && $scope.bookmarkURL !== ''){
                if(!$scope.bookmarkTitle || $scope.bookmarkTitle !== ''){
                    $scope.bookmarkTitle = $scope.bookmarkURL;
                }
                if(!$scope.note){
                    $scope.note = {};
                }
                if($scope.note && !$scope.note.bookmarks){
                    $scope.note.bookmarks = [];
                }
                $scope.note.bookmarks.push(
                    {
                        title: $scope.bookmarkTitle,
                        url: $scope.bookmarkURL
                    }
                );

                // $scope.saveBookmarks();
                SimpleStorageService
                .setNote($scope.params.noteHash,"pass1234", $scope.note)
                .then(
                    function(rs){
                        console.log("rs", rs);
                          if(!rs.status || rs.status === 0){
                              alertify.error("error: "+rs.info);
                          }else{
                            $scope.bookmarkTitle = '';
                            $scope.bookmarkURL = '';
                            alertify.success("saved");
                          }
                    }
                );


            }else{
                alertify.error("error: "+"Please enter bookmark URL.");
            }
          }

          $scope.removeBookmark = function(index){
                $scope.note.bookmarks.splice(index,1);
          }

          $scope.removeAllBookmarks = function(){
                $scope.note.bookmarks = [];
                $scope.saveBookmarks();
          }

        //   $scope.retriveTitle = function(){
        //       // TODO:   https://stackoverflow.com/questions/7901760/how-can-i-get-the-title-of-a-webpage-given-the-url-an-external-url-using-jquer
        //   };

        //Ctrl + S ===========================================================
        // http://blog.sodhanalibrary.com/2015/02/detect-ctrl-c-and-ctrl-v-using-angularjs.html#.XBPW11WJI2w
        $scope.ctrlDown = false;
        $scope.ctrlKey = 17, $scope.vKey = 86, $scope.cKey = 67;

        $scope.keyDownFunc = function($event) {
            if ($scope.ctrlDown && ($event.keyCode == $scope.cKey)) {
                // alert('Ctrl + C pressed');
                console.log('Ctrl + C pressed');
            } else if ($scope.ctrlDown && ($event.keyCode == $scope.vKey)) {
                // alert('Ctrl + V pressed');
                console.log('Ctrl + V pressed');
            } else if ($scope.ctrlDown && String.fromCharCode($event.which).toLowerCase() == 's') {
                $event.preventDefault();
                // alert('Ctrl + S pressed');
                console.log('Ctrl + S pressed');
                $scope.saveNote();
            }
        };

        angular.element($window).bind("keyup", function($event) {
            if ($event.keyCode == $scope.ctrlKey)
                $scope.ctrlDown = false;
            $scope.$apply();
        });

        angular.element($window).bind("keydown", function($event) {
            if ($event.keyCode == $scope.ctrlKey)
                $scope.ctrlDown = true;
            $scope.$apply();
        });

          // init
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
