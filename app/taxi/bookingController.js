angular.module("taxiModule").controller("bookingController", function ($scope, $http) {
    $scope.bookings = [];
    $scope.getCurrentRoutes = [];

	//Recieves the callBookings broadcast and runs the load function
    $scope.$on('callBookings', function () {
        $scope.showBookingList();
       
    });
	//Hides booking content
    $scope.$on('hideContent', function () {
        $scope.hideBookings();
    });
	
	//Populates url with data from url
    $scope.loadBookings = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking")
            .success(function (response) {
                $scope.bookings = response;

            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    

    $scope.beginBookingAdding = function () {
        $scope.isBookingAdding = true;
        $scope.showCurrentBookings = false;
		
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (response) {
                $scope.vehicles = response;
				$scope.test = "done";
               
            })
            .error(function (error) {                
                $scope.errorMessage = error;
            });
    };

    $scope.hideBookings = function () {
        $scope.showCurrentBookings = false;
		$scope.isBookingAdding;
    };

    $scope.showBookingList = function () {
        $scope.showCurrentBookings = true;
		$scope.loadBookings();
        $scope.isBookingAdding = false;
    };

    $scope.addBooking = function () {
        var bookingDetails = {

        };
    };

    $scope.cancelBooking = function () {
        $scope.showBookingList();
    };

});