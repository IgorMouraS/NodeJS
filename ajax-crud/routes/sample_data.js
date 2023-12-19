var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function (request, response, next) {

	response.render('sample_data', {
		title: 'Node JS Ajax CRUD Application'
	});

});

router.post("/action", function (request, response, next) {

	var action = request.body.action;

	if (action == 'fetch') {
		var query = "SELECT * FROM sample_data ORDER BY id DESC";

		database.query(query, function (error, data) {

			response.json({
				data: data
			});
		});
	}

});

module.exports = router;
