/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

liApp.controller(
    'mainHomeController',
    ['$scope', '$rootScope', 'alertify',
        function ($scope, $rootScope, alertify) {
          // ====================================================================================================== sop


          /*
           * below use chrome.storage.sync which limited in 100kb
          */
          /*
           $scope.clickSave = function(){
              chrome.tabs.getSelected(null,function(tab) {
                 var tabUrl = tab.url;
                 var tabUrlHash = 'hash_'+sha1(tabUrl);
                 var dataToStore = {};
                 dataToStore[tabUrlHash] = {
                   "notes": [
                     {
                       "url": tabUrl,
                       "position":{"x":10, "y": 10},
                       "text": $scope.note
                     }
                   ],
                 };
                 // position is for future put sticker(x,y) directly to page by using content_scripts.js
                 // here I use "notes":[] array only for possible future upgrades.
                 chrome.storage.sync.set(dataToStore, function() {
                     alertify.success('Saved !');
                     /////alertify.success('hash_'+tabUrlHash);
                 });
              });
           };

            // // Clear notes
            // function clearNotes(){
            //     // CHANGE: array, not a string
            //     var toRemove = [];
            //
            //     chrome.storage.sync.get( function(Items) {
            //         $.each(Items, function(index, value){
            //             // CHANGE: add key to array
            //             toRemove.push(index);
            //         });
            //
            //         alert(toRemove);
            //
            //             // CHANGE: now inside callback
            //         chrome.storage.sync.remove(toRemove, function(Items) {
            //             alert("removed");
            //
            //             chrome.storage.sync.get( function(Items) {
            //               $.each(Items, function(index, value){
            //                   alert(index);
            //               });
            //             });
            //         });
            //     });
            // };

           //initialize note
           chrome.tabs.getSelected(null,function(tab) {
             var tabUrl = tab.url;
             var tabUrlHash = 'hash_' + sha1(tabUrl);
             /////alertify.success(tabUrlHash);

             chrome.storage.sync.get(tabUrlHash, function(r) {
                 $scope.note = r[tabUrlHash]['notes'][0].text;
                 alertify.success('Retrieved !');
             });

           });
           //*/
           // ====================================================================================================== EOP
        }
    ]
);
