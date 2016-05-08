var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Place = require('../models/Place').Place;
var Message = require('../models/Message').Message;
var Gesture = require('../models/Gesture').Gesture;
/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
	Message.find({}, function (err, messages) {
		console.log("skhfkerfjhvef");
		messages.forEach( function (message) {
			console.log(message.content + "/n");
		})
	});
	console.log("srgh");
	res.render('index', { title: 'Express' });
});


router.get('/all', function(req, res, next) {
	// get all messages
 	Message.find({}, function (err, messages) {
 		var data = [];
 		messages.forEach( function (message, index) {
 			var content = message.content;
 			// get the place of the message
 			Place.findOne({ '_id' : message.place }, function (error, place) {
 				var location = place.name;
 				// get the gesture of the message
 				Gesture.findOne({ '_id' : message.gesture }, function (error, gesture) {
	 				var ges = gesture.features;
	 				var mes = [ content, location, ges ];
 					data.push(mes);
 					if (index === array.length - 1){ 
				    	res.send(data);
					}
	 			});
 			});
 		});
 	});
});

router.post('/message', function (req, res) {
	var message = req.body.message,
		lat = req.body.lat,
		lon = req.body.lon,
		gesture = req.body.gesture;

	var matchedGesture,
		matchedLocation;
	// identify the correct gesture inputted
	Gesture.findOne({ 'gestureType' : gesture}, function (err, ges) {
		var data = {};
		if (err) {
			data.failure = true;
			data.message = 'Not a recognized gesture';
		} else {
			matchedGesture = ges._id;
		}
		// match the inputted lat and long to a place
		Place.find({}, function (err, places) {
			if (err) {
				data.failure = true;
				data.message = 'No such place';
			} else {
				places.forEach(function (place) {
					if (place.latitude - lat < .1 && place.longitude - lon < .1) {
						matchedLocation = place._id;

						// create a new message in the db
						var newMessage = new Message({ 'message' : message,
														'place' : matchedLocation,
														'gesture' : matchedGesture
													});
					} else {
						data.failure = true;
						data.message = 'Current location not supported';
					}
				});
			}	
		});
	});
});

router.get('/message', function (req, res) {
	var lat = req.body.lat,
		lon = req.body.lon,
		gesture = req.body.gesture;

	Place.find({}, function (err, places) {
		var data = {};
		if (err) {
			data.failure = true;
			data.message = 'Not a recognized gesture';
		} else {
			places.forEach(function (place) {
				if (place.latitude - lat < .1 && place.longitude - lon < .1) {
					matchedLocation = place._id;

					// create a new message in the db
					var newMessage = new Message({ 'message' : message,
													'place' : matchedLocation,
													'gesture' : matchedGesture
												});
				} else {
					data.failure = true;
					data.message = 'Current location not supported';
				}
			});
		}
	})
});

module.exports = router;


module.exports = router;
