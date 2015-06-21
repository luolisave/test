/*
	Child Controller
*/
app.controller('IndexCtrl', ['$scope','$interval',function IndexCtrl($scope,$interval) {
	//0. Init.
	$scope.allTimes = {
		system:0,
		systemMs:0,
		systemMsPrevious:0,
		toronto:0,
		torontoHms:'',
		london:0,
		londonHms:'',
		londonTimezone:-6,
		sydney:0,
		sydneyHms:'',
		sydneyTimezone:-13
	}
	
	//1. functions
	//1.1 update time function
	$scope.updateTime = function(){
		$scope.allTimes.systemMsPrevious = $scope.allTimes.systemMs;
		$scope.allTimes.systemMs = new Date().getTime();
		$scope.allTimes.system = $scope.allTimes.systemMs / 1000;
		$scope.allTimes.toronto += ($scope.allTimes.systemMs - $scope.allTimes.systemMsPrevious)/1000;
	}
	//1.2
	$scope.changeLondonTimezone = function(tz){
		if(tz && tz>=-23 && tz <=23){
			$scope.allTimes.londonTimezone = tz;
		}else{
			alert("invalid timezone");
		}
	}
	//1.3
	$scope.changeSydneyTimezone = function(tz){
		if(tz && tz>=-23 && tz <=23){
			$scope.allTimes.sydneyTimezone = tz; 
		}else{
			alert("invalid timezone");
		}
	}
	//1.4 
	$scope.setTorontoTime = function(torontoTime_tmp){
		try{
			var torontoT_tmp = Hms2seconds(torontoTime_tmp);
			if(torontoT_tmp){
				$scope.allTimes.toronto = torontoT_tmp;
			}else{
				alert("Invalid Input.");
			}
		}catch(e){
			alert("Invalid Input.");
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

