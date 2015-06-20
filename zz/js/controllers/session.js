app.controller('LoginCtrl', function IndexCtrl($scope,wmudBS) {
    //open session
	var rv = wmudBS.Session("test","123456").query();
	console.log(rv);
});