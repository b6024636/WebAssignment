angular.module("taxiModule").controller("taxiController", function ($scope, $http) {
    //Sets up the taxis array
    $scope.vehicles = [];
	
	$scope.showHomeNavigation = true;
	
	
    //Gets the taxis from the url and populates the array, or error
    $scope.loadData = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (response) {
                $scope.vehicles = response;
            })
            .error(function (error) {                
                $scope.errorMessage = error;
             });
			 
		$scope.showCurrentTaxis = true;
			 
    };
	
     
    //Hides the add section
    $scope.beginEditing = function () {
        $scope.isEditing = true;
    };

	
	
	$scope.initTaxis = function () {
		
		$scope.taxiMake = "";
        $scope.taxiCapacity = "";
        $scope.taxiDriver = "";
        $scope.taxiRegistration = "";
        $scope.taxiModel = "";
	};
	
    //Gets all of the inputed data from the html form
    $scope.addTaxi = function () {
        var taxiDetails = {           
			Make: $scope.taxiMake,
			Capacity: $scope.taxiCapacity,
			Driver: $scope.taxiDriver,
			Registration: $scope.taxiRegistration,
			Model: $scope.taxiModel,
        };		
        //Posts the inputed taxi details to the url array
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle", taxiDetails)
            .success(function () {				
                $scope.initTaxis();
                $scope.isEditing = false;
                $scope.loadData()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });                
    };
	
    //Gets the taxiId to remove from the html page and deletes that entry
    $scope.removeTaxi = function (taxiId) {
        //var taxiToRemove = $scope.taxis.indexOf(taxiId);
        //$scope.taxis.splice(taxiToRemove, 1);
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its/vehicle" + taxiId)
            .success(function () {
                $scope.loadData()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    };
	
    //Switches back to to the view list
    $scope.cancelAddition = function () {
        $scope.isEditing = false;
		$scope.initTaxis();
    };

});
