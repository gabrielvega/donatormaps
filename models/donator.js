/**
 * Created by gabrielvega on 11/6/16.
 */
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Donator', new Schema({
    firstName: String,
    lastName: String,
    address: String,
    contactNumber: String,
    email: String,
    bloodGroup: String,
    ip: String,
    loc: {
      type: [Number],  // [<longitude>, <latitude>]
      index: '2d'      // geospatial index
    },
    created: String
}));