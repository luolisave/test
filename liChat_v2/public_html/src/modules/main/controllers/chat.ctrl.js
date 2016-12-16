/**
* @Author: Li Luo
* @Date:   2016-11-07T15:52:16-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-16T10:39:56-05:00
*/



/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'mainChatController',
    ['$scope', '$rootScope', '$cookies', 'alertify', 'UserService',
        function ($scope, $rootScope, $cookies, alertify, UserService) {
          // ====================================================================================================== SOP
          var socket;
          $scope.messages = [];

          //$scope.myMessage;

          $scope.sendMessage = function(){
              if($scope.myName && $scope.myName !== ""){
                  $cookies.put("myName", $scope.myName);
              }
              console.log("$scope.myMessage = ", $scope.myMessage);
              socket.emit('chat message', {
                  name: $scope.myName,
                  message: $scope.myMessage
              });
          }

          $scope.clearAll = function(){
              socket.emit('cmd', 'clear');
              $scope.messages = [];
          }



          $scope.init = function(){
              $scope.myName = $cookies.get("myName"); //getObject(key);
              socket = io();

              socket.emit('load history', 'ALL');

              socket.on('load history', function (histories) {
                  $scope.messages = histories;
                  $scope.$apply(function(){
                      $('.chat_msg_div').scrollTop(10000000);
                  });
                  $('.chat_msg_div').scrollTop(10000000);
              });

              socket.on('chat message', function (msg) {
                  if($scope.myMessage == msg.message){
                      $scope.myMessage = "";
                  }
                  $scope.messages.push(msg);
                  $scope.$apply(function(){
                      //$(".chat_msg_div").scrollTop($(".chat_msg_div").scrollHeight);
                      $('.chat_msg_div').scrollTop(10000000);
                  });

                  console.log("$scope.messages = ", $scope.messages);
              });

          };

          $scope.init();

           //*/
           // ====================================================================================================== EOP
        }
    ]
);
