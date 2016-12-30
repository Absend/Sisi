'use strict';


// MongoDB config
const mongojs = require('mongojs');
const connectionString = 'mongodb://Admin:secretpassword@ds113958.mlab.com:13958/webdjs';
const collections = ['tasks'];

const db = mongojs(connectionString, collections);

// EXPRESS config
const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser');

const app = express();

		// view engine
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

		// set static folder
app.use('/', express.static(path.join(__dirname, 'src')));

		// body-parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

		// routes
app
	.get('/tasks', function (req, res, next) {
		db['tasks'].find(function (err, tasks) {
			if (err) {
				res.send(err);
			}
			res.json(tasks);
		})
	})
	.get('/tasks/:id', function (req, res, next) {
		db['tasks'].findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
			if (err) {
				res.send(err);
			}
			res.json(task);
		})
	})
	.post('/tasks', function (req, res, next) {
		let task = req.body;

		if (!task.title || !task.name) {
			res.status(400);
			res.json({ "error": "Bad data!" });
		}
		else {
			db['tasks'].save(task, function (err, task) {
				if (err) {
					res.send(err);
				}
				res.json(task);
			})
		}
	})
	.put('/tasks/:id', function (req, res, next) {
		let task = req.body;
		let updatedTask = {};

		if (task.title) {
			updatedTask.title = task.title;
		}

		if (task.name) {
			updatedTask.name = task.name;
		}

		if (!updatedTask) {
			res.status(400);
			res.json({ "error": "Bad data!" });
		}
		else {
			db['tasks'].update({ _id: mongojs.ObjectId(req.params.id) }, updatedTask, {}, function (err, task) {
				if (err) {
					res.send(err);
				}
				res.json(task);
			})
		}
	})
	.delete('/tasks/:id', function (req, res, next) {
		db['tasks'].remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
			if (err) {
				res.send(err);
			}
			res.json(task);
		})
	});

		// connection on port
const port = 3000;
app.listen(port);
console.log(`Server running on port:${port}`);

require('openurl').open(`http://localhost:${port}`);
