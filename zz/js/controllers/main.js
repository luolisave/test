/*
	Parent Controller
*/
app.controller('MainCtrl', function MainCtrl($scope, $rootScope, wmudBS) {
    //$scope.main = "main";
    //console.log("MainCtrl");
    $scope.user = {username:"test",password:"123456",sessionId:""};
    $scope.login = function(){
        /*
        wmudBS.Session($scope.user.username,$scope.user.password).get().$promise.then(function(rv) {
            if(rv.status>0){
                $scope.user.sessionId = rv.data.sessionId;
            }else{
                alert("登录失败！");
            }
        });
        
        //*/
        wmudBS.Session().get(
                $scope.user, //{username:"test",password:"123456"},
                function(ro){
                    ro.$promise.then(function(rv) {
                        if(rv.status>0){
                            $scope.user.sessionId = rv.data.sessionId;
                        }else{
                            alert("登录失败！");
                        }
                    });
                });
    }
    
});


/*
function MainCtrl ($scope, $rootScope, $http, $cookieStore, $timeout, $location) {
	
}
//*/