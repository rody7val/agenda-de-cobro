const Provider = require('../models/provider');

exports.load = (req, res, next, providerId) => {
	Provider.findOne({
		_id: providerId
	}).exec(function (err, provider){
		if (provider){
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
		if (err){
			return res.json({
				success: false,
				err: err
			});
		}
		res.json({
			success: true,
			providers: providers
		});
	});
}