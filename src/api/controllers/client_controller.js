const Client = require('../models/client');

exports.load = (req, res, next, clientId) => {
	Client.findOne({
		_id: clientId
	}).exec((err, client) => {
		if (client) {
			req.client = client;
			next();
		}else{
			res.json({success: false});
		}
	});
}

exports.new = (req, res) => {
	const client = new Client(req.body.client);

	client.save(err => {
		if (err) {
			return res.json({
				success: false,
				client: client,
				errors: err.errors
			})
		}
		res.json({
			success: true,
			errors: []
		})
	});
}

exports.getOne = (req, res) => {
	res.json({client: req.client});
}

exports.all = (req, res) => {
	Client.find({}).exec((err, clients) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			});
		}
		res.json({
			success: true,
			clients: clients
		});
	});
}

exports.edit = (req, res) => {
	req.client.name = req.body.client.name;
	req.client.email = req.body.client.email;
	req.client.iva = req.body.client.iva;
	req.client.cuit = req.body.client.cuit;
	req.client.tel = req.body.client.tel;
	req.client.dir = req.body.client.dir;
	req.client.img = req.body.client.img;

	req.client.save(err => {
		if (err) {
			return res.json({
				success: false,
				client: req.client,
				errors: err.errors
			});
		}
		res.json({
			success: true,
			errors: []
		});
	});
}

exports.delete = (req, res) => {
	Client.findOne({
		_id: req.client._id
	}).remove().exec(err => {
		if (err) {
			return res.json({
				success: false,
				errors: err.errors
			});
		}
		res.json({
			success: true,
			errors: []
		});
	})
}