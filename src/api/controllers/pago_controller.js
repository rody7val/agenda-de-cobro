const Pago = require('../models/pago');

exports.load = (req, res, next, pagotId) => {
	Pago.findOne({
		_id: pagotId
	}).exec((err, pago) => {
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

// exports.edit = (req, res) => {
// 	req.pago.name = req.body.pago.name;
// 	req.pago.email = req.body.pago.email;
// 	req.pago.iva = req.body.pago.iva;
// 	req.pago.cuit = req.body.pago.cuit;
// 	req.pago.tel = req.body.pago.tel;
// 	req.pago.dir = req.body.pago.dir;
// 	req.pago.img = req.body.pago.img;

// 	req.pago.save(err => {
// 		if (err) {
// 			return res.json({
// 				success: false,
// 				pago: req.pago,
// 				errors: err.errors
// 			});
// 		}
// 		res.json({
// 			success: true,
// 			errors: []
// 		});
// 	});
// }

// exports.delete = (req, res) => {
// 	Pago.findOne({
// 		_id: req.pago._id
// 	}).remove().exec(err => {
// 		if (err) {
// 			return res.json({
// 				success: false,
// 				errors: err.errors
// 			});
// 		}
// 		res.json({
// 			success: true,
// 			errors: []
// 		});
// 	})
// }