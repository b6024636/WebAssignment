angular.module("taxiModule").controller("bookingController", function ($scope, $http) {
    $scope.bookings = [];
    $scope.routes = [];
	$scope.vehicles = [];
	var bookingId;

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
	
	//Shows the current bookings
    $scope.showBookingList = function () {
        $scope.showCurrentBookings = true;
		$scope.loadBookings();
        $scope.isBookingAdding = false;
		$scope.isBookingEditing = false;
		$scope.resetBookingForm();
		
    };

    
	//Shows the add screen and loads the current vehicles and routes
    $scope.beginBookingAdding = function () {
        $scope.isBookingAdding = true;
        $scope.showCurrentBookings = false;
		//Current routes
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route")
            .success(function (response) {
                $scope.routes = response;

            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
		//Current vehicles
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (response) {
                $scope.vehicles = response;               
            })
            .error(function (error) {                
                $scope.errorMessage = error;
            });
    };

	//Hides the booking content
    $scope.hideBookings = function () {
        $scope.showCurrentBookings = false;
		$scope.isBookingAdding = false;
		$scope.isBookingEditing = false;
    };
	
	//Sets all the inputs blank
	$scope.resetBookingForm = function () {
		$scope.addBookingDropOff = "";
		$scope.addBookingPickup = "";
		$scope.addBookingNoPassengers = "";
		$scope.addBookingName = "";
		$scope.addBookingVehicleId = "";
		$scope.editBookingDropOff = "";
		$scope.editBookingPickup = "";
		$scope.editBookingNoPassengers = "";
		$scope.editBookingVehicleId = "";
	};

	//Pushes the new details to the array
    $scope.addBooking = function () {
        var bookingDetails = {
			DropOffLocation: $scope.addBookingDropOff,
			PickupLocation: $scope.addBookingPickup,
			CurrentPassenger: $scope.addBookingNoPassengers,
			PassengerName: $scope.addBookingName,
			VehicleId: $scope.addBookingVehicleId
        };
		//Posts the inputed booking details to the url array (Id auto increments, isn't needed)
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking", bookingDetails)
            .success(function () {				
                $scope.showBookingList();     
            })
            .error(function (error) {
                $scope.errorMessage = error;
            }); 
    };
	
	//Goes to the show booking view
    $scope.cancelBooking = function () {
        $scope.showBookingList();
    };
	
	$scope.removeBooking = function (bookingId) {
		$http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + bookingId.Id)
            .success(function () {
                $scope.loadBookings()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
	};
	
	//Gets the selected booking id for editing and displays the response in the form
    $scope.editBooking = function (id) {
        $scope.isBookingEditing = true;
        $scope.showCurrentBookings = false;
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + id)
            .success(function (response) {
                bookingId = response.Id;
                $scope.editBookingDropOff = response.DropOffLocation;
				$scope.editBookingPickup = response.PickupLocation;
				$scope.editBookingNoPassengers = response.CurrentPassenger;
				$scope.BookingName = response.PassengerName;
				$scope.editBookingVehicleId = response.VehicleId;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
            
    };
	
	//Similar to the add function, this takes the new edited inputs and updates the existing record using its Id
    $scope.editBookingPush = function () {
        var editedBookingDetails = {
			Id: bookingId,
            DropOffLocation: $scope.editBookingDropOff,
			PickupLocation: $scope.editBookingPickup,
			CurrentPassenger: $scope.editBookingNoPassengers,
			PassengerName: $scope.editBookingName,
			VehicleId: $scope.editBookingVehicleId
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking", editedBookingDetails)
            .success(function (response) {
                $scope.showBookingList();
            })
            .error(function (error) {
                $scope.errorMessage;
            });
    };

});