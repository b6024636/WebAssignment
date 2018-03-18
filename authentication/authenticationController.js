angular.module("authenticationModule").controller("authenticationController", function ($scope, $http) {

    

    // *** VARIABLE DEFINITIONS *** //
    $scope.name = "";
    $scope.isAuthenticated = false;
    $scope.role = 0;


   

    // *** FUNCTION DEFINITIONS *** //
    $scope.login = function () {
        var authenticationDetails = {
            username: $scope.username,
            password: $scope.password,
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/login", authenticationDetails)
        .success(function (response) {
            $scope.name = response.name;
            $scope.isAuthenticated = response.authenticated;
            $scope.role = response.role;
                       if($scope.isAuthenticated == true) {
                           $scope.loginError = false;
						   $scope.loginForm = false;
                           $scope.broadcast('loadHome');
						   
						   
                       } else{
                           $scope.loginError
                       }
        })
        .error(function (error) {
            $scope.errorMessage = error;
        });
    };

});