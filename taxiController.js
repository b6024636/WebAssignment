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

    $scope.returnHome = function () {
        $scope.showHomeNavigation = true;
        $scope.showCurrentTaxis = true;
        $scope.isTaxiAdding = false;
    };
     
    //Hides the show taxis section adn displays the add taxi form
    $scope.beginTaxiAdding = function () {
        $scope.isTaxiAdding = true;
        $scope.showCurrentTaxis = true;
    };
    //Hides the taxi adding section and shows all the current vehicles
    $scope.hideTaxiAdding = function () {
        $scope.isTaxiAdding = false;
        $scope.showCurrentTaxis = false;
        $scope.showHomeNavigation = false;
    };

	
	//sets the vehicle input forms to be blank
	$scope.resetAddTaxis = function () {		
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
        //Posts the inputed taxi details to the url array (Id auto increments, isn't needed)
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle", taxiDetails)
            .success(function () {				
                $scope.initTaxis();
                $scope.hideTaxiAdding();
                $scope.loadData()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });                
    };

    //Switches back to to the view list
    $scope.cancelAddition = function () {
        $scope.hideTaxiAdding();
        $scope.resetAddTaxis();
    };

    //Gets the taxiId to remove from the html page and deletes that entry
    $scope.removeTaxi = function (taxiId) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + taxiId.Id)
            .success(function () {
                $scope.loadData()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    };
	
    

});
