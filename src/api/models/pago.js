const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Float = require('mongoose-float').loadType(mongoose, 2);
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const PagoSchema = new Schema({
	type: String,
	desc: String,
	total: Float,
	state: Boolean,
	_provider: { type: Schema.Types.ObjectId, ref: 'Provider' },
    created: {
        type: Date,
        default: Date.now
    }
});

// PagoSchema.plugin(uniqueValidator, { message: 'Lo sentimos, el {PATH} ({VALUE}) ya existe. Prueba con otro?' });
PagoSchema.plugin(deepPopulate);

module.exports = mongoose.model('Pago', PagoSchema);