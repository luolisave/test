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
    'mainNotePlusController',
    ['$scope', '$rootScope', '$window', '$stateParams', 'alertify', 'UserService', 'SimpleStorageService',
        function ($scope, $rootScope, $window, $stateParams, alertify, UserService, SimpleStorageService) {
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

        //Ctrl + S ===========================================================
        // http://blog.sodhanalibrary.com/2015/02/detect-ctrl-c-and-ctrl-v-using-angularjs.html#.XBPW11WJI2w
        $scope.ctrlDown = false;
        $scope.ctrlKey = 17, $scope.vKey = 86, $scope.cKey = 67;

        // init
          $scope.init = function(){

            // https://github.com/angular-ui/ui-tinymce
            $scope.tinymceOptions = {
                theme: "modern",
                plugins: [
                    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen",
                    "insertdatetime media nonbreaking save table directionality",
                    "emoticons template paste textcolor colorpicker textpattern imagetools"
                ],
                toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
                toolbar2: "print preview media | link image | forecolor backcolor emoticons",
                setup: function(editor) {
                    editor.on("keyup", function($event) {
                        // console.log('editor key up, editor =', editor, ' $event = ', $event);
                        if ($event.keyCode == $scope.ctrlKey)
                            $scope.ctrlDown = false;
                        $scope.$apply();
                    });
                    editor.on("keydown", function($event) {
                        // console.log('editor key down');
                        if ($event.keyCode == $scope.ctrlKey)
                            $scope.ctrlDown = true;

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
                        $scope.$apply();
                    });
                }
              };
              // editor.shortcuts.add('ctrl+a', "description of the shortcut", function() {});

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
