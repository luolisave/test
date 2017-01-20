/**
 * Created by LiL
 */

console.log('DEF Home3Controller on: ', myApp.name);

myApp.controller('Home3Controller', ['$scope',
    function ($scope) {
        console.log("init Home3Controller!");
        $scope.state3var = "state3var string is here!";
    }
]);
myApp.config(function($controllerProvider){
    console.log('$controllerProvider',$controllerProvider);
    $controllerProvider.register('Home3Controller',function ($scope) {

            $scope.state3var = "state3var string is here!";
        });
});