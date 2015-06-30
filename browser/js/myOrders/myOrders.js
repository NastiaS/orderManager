app.config(function ($stateProvider) {

    $stateProvider.state('myOrders', {
        url: '/myOrders',
        templateUrl: 'js/myOrders/myOrders.html',
        controller: 'MyOrdersCtrl'
    });
});

app.controller('MyOrdersCtrl', function ($scope, OrderFactory) {

    $scope.futureOrder = {
        itemId : null,
        itemName : null,
        customer : null,
        quantity : null,
        status : null
    };

    $scope.showForm = false;
    $scope.showButton = null;
    $scope.orders = null;
    $scope.editing = false;

//display all orders that are in db
    OrderFactory.getAllOrders().then(function (orders) {
        $scope.orders = orders;
    });

//add an order
    $scope.addOrder = function () {

        OrderFactory.addOneOrder($scope.futureOrder)
            .then(function (order) {
                $scope.orders.push(order);
                $scope.showForm = false;
            }).catch(function (err) {
                console.log(err);
            });
    };

//delete a specific order
    $scope.deleteOrder = function (order_id) {

        OrderFactory.deleteOrder(order_id)
            .then(function () {
                $scope.orders = $scope.orders.filter(function (e) {
                    return e._id !== order_id;
                });
            }).catch(function (err) {
                console.log(err);
            });
    };

//update a specific order
    $scope.updateOrder = function (order_id, order) {

        OrderFactory.updateOrder(order_id, order).then(function (order) {
            $scope.order = order;
            $scope.showForm = false;
        }, function (err) {
            console.log(err);
        });
    };

//toggle the form
    $scope.toggleOrderForm = function (order) {
        
        $scope.showForm = !$scope.showForm;
        if(order){
            $scope.futureOrder = order;
            $scope.editing = !$scope.editing;
        }
    };

});
