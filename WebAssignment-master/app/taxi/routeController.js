angular.module("taxiModule").controller("routeController", function ($scope, $http) {

    $scope.routes = [];
    var routeId

    $scope.$on('callRoutes', function () {
        $scope.showRouteList();
        $scope.loadRoutes();
    });

    $scope.$on('hideContent', function () {
        $scope.hideRoutes();
    });

    $scope.loadRoutes = function () {
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route")
            .success(function (response) {
                $scope.routes = response;

            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    };

    $scope.hideRoutes = function () {
        $scope.showCurrentRoutes = false;
        $scope.isRouteAdding = false;
        $scope.isRouteEditing = false;
    };

    $scope.showRouteList = function (){
        $scope.showCurrentRoutes = true;
        $scope.isRouteAdding = false;
        $scope.isRouteEditing = false;
        $scope.loadRoutes();
        $scope.resetRouteForm();
    };

    $scope.beginRouteAdding = function () {
        $scope.showCurrentRoutes = false;
        $scope.isRouteAdding = true;
    }

    $scope.resetRouteForm = function () {
        $scope.addRouteStart = "";
        $scope.addRouteEnd = "";
        $scope.editRouteEnd = "";
        $scope.editRouteStart = ";"
    };

    $scope.addRoute = function () {
        var routeDetails = {
            RouteStartPoint: $scope.addRouteStart,
            RouteEndPoint: $scope.addRouteEnd,
        };
        //Posts the inputed route details to the url array (Id auto increments, isn't needed)
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route", routeDetails)
            .success(function () {
                $scope.showRouteList();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    
    };
    $scope.cancelRoute = function () {
        $scope.showRouteList();
    };

    //Gets the route to remove from the html page and deletes that entry
    $scope.removeRoute = function (routeId) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route/" + routeId.Id)
            .success(function () {
                $scope.loadRoutes()
            })
            .error(function (error) {
                $scope.errorMessage = error;
            })
    };

    //Gets the selected taxi id for editing and displays the response in the form
    $scope.editRoute = function (id) {
        $scope.isRouteEditing = true;
        $scope.showCurrentRoutes = false;
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route/" + id)
            .success(function (response) {
                routeId = response.Id;
                $scope.editRouteEnd = response.RouteEndPoint;
                $scope.editRouteStart = response.RouteStartPoint;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    };

    //Similar to the add function, this takes the new edited inputs and updates the existing record using its Id
    $scope.editRoutePush = function () {
        var editedRouteDetails = {
            Id: routeId,
            RouteStartPoint: $scope.editRouteStart,
            RouteEndPoint: $scope.editRouteEnd,
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/route", editedRouteDetails)
            .success(function (response) {
                $scope.showRouteList();
            })
            .error(function (error) {
                $scope.errorMessage;
            });
    };

    $scope.cancelEdit = function () {
        $scope.showRouteList();
    };
});