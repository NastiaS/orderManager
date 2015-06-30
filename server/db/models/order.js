'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var OrderSchema = new mongoose.Schema({
    itemId : { type : Number},
    itemName : { type : String},
    customer : { type : String},
    quantity  : { type : Number},
    status: { type : String},
});


mongoose.model('Order', OrderSchema);