const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Float = require('mongoose-float').loadType(mongoose, 2);
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const MotionSchema = new Schema({
	type: String,
	date: Date,
	_pago: { type: Schema.Types.ObjectId, ref: 'Pago' },
    created: {
        type: Date,
        default: Date.now
    }
})
;
// MotionSchema.plugin(uniqueValidator, { message: 'Lo sentimos, el {PATH} ({VALUE}) ya existe. Prueba con otro?' });
MotionSchema.plugin(deepPopulate);

module.exports = mongoose.model('Motion', MotionSchema);