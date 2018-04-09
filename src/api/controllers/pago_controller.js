const Pago = require('../models/pago');

exports.load = (req, res, next, pagoId) => {
	Pago.findOne({
		_id: pagoId
	}).deepPopulate('_provider')
	.exec((err, pago) => {
		if (pago) {
			req.pago = pago;
			next();
		}else{
			res.json({success: false});
		}
	});
}

exports.new = (req, res) => {
	const pago = new Pago(req.body.pago);

	pago.save(err => {
		if (err) {
			return res.json({
				success: false,
				pago: pago,
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
	res.json({pago: req.pago});
}

exports.all = (req, res) => {
	Pago.find({})
	.deepPopulate('_provider')
	.exec((err, pagos) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			});
		}
		res.json({
			success: true,
			pagos: pagos
		});
	});
}

exports.findByType = (req, res) => {
	Pago.find({ type: req.params.type })
	.deepPopulate('_provider')
	.exec((err, pagos) => {
		if (err) {
			return res.json({
				success: false,
				errors: err,
			});
		}
		res.json({
			success: true,
			pagos: pagos
		});
	});
}

exports.edit = (req, res) => {
	req.pago.type = req.body.pago.type;
	req.pago.desc = req.body.pago.desc;
	req.pago.total = req.body.pago.total;
	req.pago._provider = req.body.pago._provider;

	req.pago.save(err => {
		if (err) {
			return res.json({
				success: false,
				pago: req.pago,
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
	Pago.findOne({
		_id: req.pago._id
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