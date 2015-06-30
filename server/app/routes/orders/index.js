'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
// var Promise = require('bluebird'); 
var Order = mongoose.model('Order');

module.exports = router;

router.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
});

//I want to see all orders
router.get('/', function (req, res, next) {

   Order.find({})
    .exec()
    .then(function(orders){
        res.json(orders);
    }, next)
});


// I want to create a new order
router.post('/', function (req, res, next) {

    Order.create(req.body)
    .then(function(newOrder){
        res.json(newOrder);
    }, next)
});

//I want to update an existing order
router.put('/:order_id', function (req, res, next) {
    
    Order.findOneAndUpdate({_id: req.params.order_id}, req.body)
    .exec()
    .then(function(updatedOrder){
        res.json(updatedOrder);
    }, next)
});

//I want to delete a particular order
router.delete('/:order_id', function (req, res, next) {
    
    Order.remove({_id: req.params.order_id})
    .exec()
    .then(function(orderToDelete){
        res.sendStatus(200);
    }, next)
});