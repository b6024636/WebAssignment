angular.module("taxiModule").controller("pageController", function ($scope, $http) {
    $scope.showHomeNavigation = true;

    //Displays the main navigation element broadcasts a message to other controllers to hide their content
    $scope.returnHome = function () {   
        $scope.$broadcast('hideContent');
        $scope.showHomeNavigation = true;
      
    };

    //Hides main navigation, shows the current taxis
    $scope.viewTaxis = function () {
        $scope.showCurrentTaxis = true;
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
});