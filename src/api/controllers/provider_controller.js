const Provider = require('../models/provider');

exports.load = (req, res, next, providerId) => {
	Provider.findOne({
		_id: providerId
	}).exec((err, provider) => {
		if (provider) {
			req.provider = provider;
			next();
		}else{
			res.json({success: false});
		}
	});
}

exports.new = (req, res) => {
	const provider = new Provider(req.body.provider);

	provider.save(err => {
		if (err) {
			return res.json({
				success: false,
				provider: provider,
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
	res.json({provider: req.provider});
}

exports.all = (req, res) => {
	Provider.find({}).exec((err, providers) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			});
		}
		res.json({
			success: true,
			providers: providers
		});
	});
}

exports.edit = (req, res) => {
	req.provider.name = req.body.provider.name;
	req.provider.email = req.body.provider.email;
	req.provider.iva = req.body.provider.iva;
	req.provider.cuit = req.body.provider.cuit;
	req.provider.tel = req.body.provider.tel;
	req.provider.dir = req.body.provider.dir;
	req.provider.img = req.body.provider.img;

	req.provider.save(err => {
		if (err) {
			return res.json({
				success: false,
				provider: req.provider,
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
	Provider.findOne({
		_id: req.provider._id
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