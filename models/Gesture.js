//Danny Callahan
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

// add the filed usernames, as it's so often refered to
var GestureSchema = new Schema({
	features: [{
		type: Number,
		required: true
	}]
});

module.exports = {
  Gesture: mongoose.model('Gesture', GestureSchema)
};
