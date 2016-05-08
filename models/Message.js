//Danny Callahan
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,
	Place = require('./Place').Place;
	Gesture = require('./Gesture').Gesture;

// add the filed usernames, as it's so often refered to
var MessageSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	place: {
		type: ObjectId,
		ref: 'Place'
	},
	gesture: {
		type: ObjectId,
		ref: 'Gesture'
	}
});

module.exports = {
  Message: mongoose.model('Message', MessageSchema)
};