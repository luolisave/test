/**
* @Author: Li Luo
* @Date:   2016-11-07T15:52:16-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-14T16:06:01-05:00
*/



/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'mainChatController',
    ['$scope', '$rootScope', 'alertify', 'UserService',
        function ($scope, $rootScope, alertify, UserService) {
          // ====================================================================================================== SOP
          var socket;
          $scope.messages = [];

          //$scope.myMessage;

          $scope.sendMessage = function(){
              console.log("$scope.myMessage = ", $scope.myMessage);
              socket.emit('chat message', $scope.myMessage);
          }

          $scope.clearAll = function(){
              socket.emit('cmd', 'clear');
              $scope.messages = [];
          }

          $scope.init = function(){
              socket = io();

              socket.emit('load history', 'ALL');

              socket.on('load history', function (histories) {
                  $scope.messages = histories;
                  $scope.$apply();
                  window.scrollTo(0, document.body.scrollHeight);
              });

              socket.on('chat message', function (msg) {
                  if($scope.myMessage === msg){
                      $scope.myMessage = "";
                  }
                  $scope.messages.push(msg);
                  $scope.$apply();
                  console.log("$scope.messages = ", $scope.messages);
              });
          };

          $scope.init();

           //*/
           // ====================================================================================================== EOP
        }
    ]
);
