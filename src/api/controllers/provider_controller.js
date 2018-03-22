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
			// next(new Error('No existe userId = '+ userId)) 
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