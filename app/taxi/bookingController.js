angular.module("taxiModule").controller("bookingController", function ($scope, $http) {
    $scope.bookings = [];
    $scope.routes = [];
	$scope.vehicles = [];
	$scope.role = 0;
	var bookingId;

	//Recieves callBookings broadcast and loads relevant data for staff role
    $scope.$on('callBookings1', function () {
        $scope.role = 1;  
        $scope.showBookingList();   
    });
	//Same as above but for manager
	$scope.$on('callBookings2', function () {
        $scope.role = 2;  
        $scope.showBookingList();    
    });
	//Hides booking content
    $scope.$on('hideContent', function () {
        $scope.hideBookings();
    });
	
	//Populates url with data from url and gets the current routes and vehicles
    $scope.loadBookings = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking")
            .success(function (response) {
                $scope.bookings = response;

            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
		//Gets current routes
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route")
            .success(function (response) {
                $scope.routes = response;

            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
		//Gets current vehicles
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (response) {
                $scope.vehicles = response;               
            })
            .error(function (error) {                
                $scope.errorMessage = error;
            });
    };
	
	//Shows the current bookings
    $scope.showBookingList = function () {
        $scope.showCurrentBookings = true;
		$scope.loadBookings();
		//Shows remove and edit depending on role
		if($scope.role == 2){
			$scope.authorised = true;
		}else{
			$scope.authorised = false;
		}	
        $scope.isBookingAdding = false;
		$scope.isBookingEditing = false;
		$scope.resetBookingForm();
		
    };

    
	//Shows the add screen
    $scope.beginBookingAdding = function () {
        $scope.isBookingAdding = true;
        $scope.showCurrentBookings = false;

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
		//Sets the forms to be valid after being reset
		$scope.addBookingForm.$setPristine();
		$scope.editBookingForm.$setPristine();
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
	//This function is used to get the maximum amount of passengers which can fit in the selected taxi
	$scope.maxPassengers = function (vehicleId) {
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + vehicleId)
		.success(function(response){
			$scope.maxTaxiCapacity = response.Capacity;
		})
		.error(function(error){
			$scope.errorMessage = error;
		});
	};

});