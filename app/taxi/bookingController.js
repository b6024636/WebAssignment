angular.module("taxiModule").controller("bookingController", function ($scope, $http) {
    $scope.bookings = [];
    $scope.getCurrentRoutes = [];

    $scope.$on('callBookings', function () {
        $scope.showBookingList();
        $scope.loadBookings();
       
    });

    $scope.$on('hideContent', function () {
        $scope.hideBookings();
    });

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
    };

    $scope.hideBookings = function () {
        $scope.showCurrentBookings = false;
    };

    $scope.showBookingList = function () {
        $scope.showCurrentBookings = true;
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