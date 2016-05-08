//Danny Callahan
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

// add the filed usernames, as it's so often refered to
var PlaceSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	latitude: {
		type: Number,
		required: true
	},
	longitude: {
		type: Number,
		required: true
	}
});

module.exports = {
  Place: mongoose.model('Place', PlaceSchema)
};