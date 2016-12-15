/**
* @Author: Li Luo
* @Date:   2016-12-15T13:14:46-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-15T13:15:00-05:00
*/

liApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
