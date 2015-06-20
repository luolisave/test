/*
	Child Controller
*/
app.controller('TestCtrl', function TestCtrl($scope,wmudBS) {
    //open session
	//var rv = wmudBS.Session("test","123456").query();
	//console.log(rv);
	wmudBS.Test().get(
		{},
		function(u, getResponseHeaders){
			u.userId = "456";
			$scope.test = u;
			
			u.$save(function(u, putResponseHeaders) {
				u.var2= "789";
				console.log("in $save call back. u = ", u);
			    //u => saved user object
			    //putResponseHeaders => $http header getter
			});
			console.log(typeof(u));
			console.log(u);
			console.log(u.userId);
		}
	);
});

