angular.module("taxiModule").controller("taxiController", function ($scope, $http) {
    //Sets up the taxis array
    $scope.vehicles = [];
    var taxiID;

    //Recieves callTaxis and loads data
    $scope.$on('callTaxis', function () {
        $scope.showTaxiList();
        $scope.loadTaxis();       
    });

    $scope.$on('hideContent', function () {
        $scope.hideTaxis();
    });
	
    //Gets the taxis from the url and populates the array, or error
    $scope.loadTaxis = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (response) {
                $scope.vehicles = response;
               
            })
            .error(function (error) {                
                $scope.errorMessage = error;
             });
			 
		
			 
    };

    //Hides all the taxis elements
    $scope.hideTaxis = function () {
        $scope.isTaxiAdding = false;
        $scope.showCurrentTaxis = false;
        $scope.isTaxiEditing = false;
    };
    
    //sets the vehicle input forms to be blank
    $scope.resetTaxiForm = function () {
        $scope.taxiMake = "";
        $scope.taxiCapacity = "";
        $scope.taxiDriver = "";
        $scope.taxiRegistration = "";
        $scope.taxiModel = "";
        $scope.addTaxiMake = "";
        $scope.addTaxiCapacity = "";
        $scope.addTaxiDriver = "";
        $scope.addTaxiRegistration = "";
        $scope.addTaxiModel = "";
    };

    //Hides the show taxis section adn displays the add taxi form
    $scope.beginTaxiAdding = function () {
        $scope.isTaxiAdding = true;
        $scope.showCurrentTaxis = false;
    };
    //Hides the taxi adding section and shows all the current vehicles
    $scope.showTaxiList = function () {
        $scope.isTaxiAdding = false;
        $scope.showCurrentTaxis = true;
        $scope.showHomeNavigation = false;
        $scope.isTaxiEditing = false;
        $scope.loadTaxis();
        $scope.resetTaxiForm();
    };

	
	
	
    //Gets all of the inputed data from the html form
    $scope.addTaxi = function () {
        var taxiDetails = {           
			Make: $scope.addTaxiMake,
			Capacity: $scope.addTaxiCapacity,
			Driver: $scope.addTaxiDriver,
			Registration: $scope.addTaxiRegistration,
			Model: $scope.addTaxiModel,
        };		
        //Posts the inputed taxi details to the url array (Id auto increments, isn't needed)
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle", taxiDetails)
            .success(function () {				
                $scope.showTaxiList();     
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });                
    };

    //Switches back to to the view list
    $scope.cancelAddition = function () {
        $scope.showTaxiList();
    };

    //Gets the taxiId to remove from the html page and deletes that entry
    $scope.removeTaxi = function (taxiId) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + taxiId.Id)
            .success(function () {
                $scope.loadTaxis()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    };
    //Gets the selected taxi id for editing and displays the response in the form
    $scope.editTaxi = function (id) {
        $scope.isTaxiEditing = true;
        $scope.showCurrentTaxis = false;
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + id)
            .success(function (response) {
                taxiID = response.Id;
                $scope.taxiMake = response.Make;
                $scope.taxiCapacity = response.Capacity;
                $scope.taxiDriver = response.Driver;
                $scope.taxiRegistration = response.Registration;
                $scope.taxiModel = response.Model;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
            
    };

    //Similar to the add function, this takes the new edited inputs and updates the existing record using its Id
    $scope.editTaxiPush = function () {
        var editedTaxiDetails = {
            Id: taxiID,
            Make: $scope.taxiMake,
            Capacity: $scope.taxiCapacity,
            Driver: $scope.taxiDriver,
            Registration: $scope.taxiRegistration,
            Model: $scope.taxiModel,
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle", editedTaxiDetails)
            .success(function (response) {
                $scope.showTaxiList();
            })
            .error(function (error) {
                $scope.errorMessage;
            });
    };

    $scope.cancelEdit = function () {
        $scope.showTaxiList();
        $scope.resetTaxiForm();
    };
	
    

});
