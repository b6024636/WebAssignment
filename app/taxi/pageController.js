angular.module("taxiModule").controller("pageController", function ($scope, $http) {

	$scope.loginButton = true;
	$scope.logoutButton = true;
	$scope.defaultMessage = true;
	$scope.showHomeNavigation = true;
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
        //Broadcast used to send message call taxis1/2 depending on role		
		if($scope.role == 2){
			$scope.$broadcast('callTaxis2');			
		}else{
			$scope.$broadcast('callTaxis1');			
		}
        
    };

    $scope.viewBookings = function () {
        $scope.showHomeNavigation = false;
        if($scope.role == 2){
			$scope.$broadcast('callBookings2');			
		}else{
			$scope.$broadcast('callBookings1');			
		}
    };

    $scope.viewRoutes = function () {
        $scope.showHomeNavigation = false;
        if($scope.role == 2){
			$scope.$broadcast('callRoutes2');			
		}else{
			$scope.$broadcast('callRoutes1');			
		}
    };
	
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
							$scope.logoutButton = false;
							$scope.defaultMessage = false;
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
		$scope.returnHome();
		$scope.name = "";
		$scope.isAuthenticated = false;
		$scope.role = 0;
		$scope.logoutButton = true;
		$scope.loginButton = true;		
		$scope.showHomeNavigation = false;
		$scope.currentUser = false;
		$scope.defaultMessage = true;
	};


});