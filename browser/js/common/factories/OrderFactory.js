app.factory('OrderFactory', function ($http) {
    return {

        addOneOrder : function (order) {

            return $http.post('/api/order', order).then(function (response) {
                return response.data;
            });
        },

        getAllOrders : function () {

            return $http.get("/api/order")
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    console.log(err);
                });
        },

        updateOrder : function (order_id, modifiedOrder) {

            return $http.put('/api/order/' + order_id, modifiedOrder).then(function (response) {
                return response.data;
            }, function (err) {
                console.log(err);
            });
        },

        deleteOrder : function (order_id) {
        
            return $http.delete('/api/order/' + order_id).then(function (response) {
                if (response.status !== 200) throw new Error("Deletion error.");
                return response.status;
            }, function (err) {
                console.log(err);
            });
        }
    };
});