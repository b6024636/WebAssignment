angular.module("taxiModule").controller("pageController", function ($scope, $http) {

	$scope.loginButton = true;
	
    //Displays the main navigation element broadcasts a message to other controllers to hide their content
    $scope.returnHome = function () {   
		if($scope.isAuthenticated == true) {
			$scope.$broadcast('hideContent');
			$scope.showHomeNavigation = true;
			$scope.loginForm = true;	
			$scope.currentUser = true;
		}        
    };


    //Hides main navigation, shows the current taxis
    $scope.viewTaxis = function () {
        $scope.showHomeNavigation = false;
        //Broadcast used to send message taxiController so that the http.get function can be run
        $scope.$broadcast('callTaxis');
    };

    $scope.viewBookings = function () {
        $scope.showHomeNavigation = false;
        $scope.$broadcast('callBookings');
    };

    $scope.viewRoutes = function () {
        $scope.showHomeNavigation = false;
        $scope.$broadcast('callRoutes');
    }
	
	//Login//
	
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
							$scope.loginButton = false;
							$scope.logout = false;
							$scope.returnHome();
							$scope.loginError = false;
							$scope.username = "";
							$scope.password = "";				
                             
						} else{
                           $scope.loginError = true;
                       }
        })
        .error(function (error) {
            $scope.errorMessage = error;
        });
    };
	
	$scope.logout = function (){
		$scope.name = "";
		$scope.isAuthenticated = false;
		$scope.role = 0;
		$scope.returnHome();
		$scope.showHomeNavigation = false;
		$scope.currentUser = false;
	}


});