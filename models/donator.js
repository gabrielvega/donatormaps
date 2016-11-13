/**
 * Created by gabrielvega on 11/6/16.
 */
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var donatorSchema = new Schema({
                        firstName: { type: String, required: true },
                        lastName:  { type: String, required: true },
                        address: { type: String, required: true },
                        contactNumber:  { type: String, required: true },
                        email:  { type: String, required: true },
                        bloodGroup:  { type: String, required: true },
                        ip: String,
                        loc: { type: Object, required: true },
                        created: String
                    });

donatorSchema.methods.checkForDuplicateEmails = function(cb) {
	this.model('Donator').findOne({
		email: this.email
	}, function(err, val) {
		cb(!!val);
	});
};

module.exports = mongoose.model('Donator', donatorSchema);