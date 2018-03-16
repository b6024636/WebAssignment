app.controller("taxiController", function ($scope, $http)
{
    //An array that stores the taxi details
    $scope.taxis = [
        {
            Id: 1,
            Make: "Toyota",
            Capacity: "3",
            Driver: "John Doe",
            Registration: "PR1US",
            Model: "Prius",
        },
        {
            Id: 2,
            Make: "Ford",
            Capacity: "5",
            Driver: "Dohn Joe",
            Registration: "FRDKA",
            Model: "Ka",
        },
        {
            Id: 3,
            Make: "Tesla",
            Capacity: 3,
            Driver: "John Doe",
            Registration: "D03",
            Model: "Model 3"
        }
    ];

    $scope.init = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
            .success(function (response) {
                $scope.taxis = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.isEditing = false;

    $scope.beginEditing = function () {
        $scope.isEditing = true;
    };

    $scope.cancelAddition = function () {
        $scope.isEditing = false;
    };

    //Function to add new taxis
    $scope.addTaxi = function () {
        //Variable taxiDetails takes all the inputs for the taxi
        var taxiDetails = {
            Id: $scope.taxis.length + 1,
            Make: $scope.taxiMake,
            Capacity: $scope.taxiCapacity,
            Driver: $scope.taxiDriver,
            Registration: $scope.taxiRegistration,
            Model: $scope.taxiModel
        };
        //Pushes the variable to the array
        $scope.taxis.push(taxiDetails);
        //Sets the text fields to be blank
        $scope.taxiMake = "";
        $scope.taxiCapacity = "";
        $scope.taxiDriver = "";
        $scope.taxiRegistration = "";
        $scope.taxiModel = "";
        //Switches to the taxi view
        $scope.isEditing = false;
    };

    //Function to remove taxis, gets taxi id from the web page
    $scope.removeTaxi = function (taxiId) {
        
        var taxiToRemove = $scope.taxis.indexOf(taxiId);        
        taxiToRemove += taxiId;
        $scope.errorMessage = taxiToRemove;
        $scope.taxis.splice(taxiToRemove, 1);
       
    };

   

});