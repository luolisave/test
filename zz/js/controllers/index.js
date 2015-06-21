/*
	Child Controller
*/
app.controller('IndexCtrl', ['$scope','$interval',function IndexCtrl($scope,$interval) {
	//0. Init.
	$scope.allTimes = {
		toronto:54087,
		torontoHms:'',
		london:0,
		londonHms:'',
		sydney:0,
		sydneyHms:''
	}
	
	//1. functions
	//1.1 update time function
	$scope.updateTime = function(){
		//var tmpTorontoSecond = Hms2seconds($scope.torontoTimeSetup);
		if(angular.isNumber($scope.allTimes.toronto)){
			console.log($scope.allTimes.toronto);
			$scope.torontoHms = Seconds2hms($scope.allTimes.toronto);
			console.log($scope.torontoHms);
		}else{
			alert("Invalid toronto time.");
		}
	}
	
	//2. call updateTime()
	$scope.updateTime();
	
	
	//3. Setup time interval
	$interval(function(){
		console.log("call $scope.updateTime()");
		$scope.updateTime();
	}, TIME_INTERVAL);
	

}]);

