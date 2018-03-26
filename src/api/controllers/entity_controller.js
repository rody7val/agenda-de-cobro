const Entity = require('../models/entity');

exports.load = (req, res, next, entityId) => {
	Entity.findOne({
		_id: entityId
	}).exec((err, entity) => {
		if (entity) {
			req.entity = entity;
			next();
		}else{
			res.json({success: false});
		}
	});
}

exports.new = (req, res) => {
	const entity = new Entity(req.body.entity);

	entity.save(err => {
		if (err) {
			return res.json({
				success: false,
				entity: entity,
				errors: err.errors
			})
		}
		res.json({
			success: true,
			entity: entity,
			errors: []
		})
	});
}

exports.getOne = (req, res) => {
	res.json({entity: req.entity});
}

exports.count = (req, res) => {
	Entity.count({}, (err, count) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			});
		}
		res.json({
			success: true,
			count: count
		});
	})
}

exports.edit = (req, res) => {
	req.entity.name = req.body.entity.name;
	req.entity.email = req.body.entity.email;
	req.entity.iva = req.body.entity.iva;
	req.entity.cuit = req.body.entity.cuit;
	req.entity.tel = req.body.entity.tel;
	req.entity.dir = req.body.entity.dir;
	req.entity.img = req.body.entity.img;

	req.entity.save(err => {
		if (err) {
			return res.json({
				success: false,
				entity: req.entity,
				errors: err.errors
			});
		}
		res.json({
			success: true,
			errors: []
		});
	});
}

exports.all = (req, res) => {
	Entity.find({}).exec((err, entitys) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			});
		}
		res.json({
			success: true,
			entitys: entitys
		});
	});
}

// exports.delete = (req, res) => {
// 	Entity.findOne({
// 		_id: req.entity._id
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