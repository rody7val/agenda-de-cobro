const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
    name: {
        type: String,
        index: true,
        validate: [function(name){
            return name.length >= 3;
        }, 'El "Nombre" debe tener tres (3) o más caracteres.']
    },
    email: {
        type: String,
        index: {unique: true},
        validate: [function(email){
            return !(!email.match(/.+\@.+\..+/));
        }, 'El "Email" es incorrecto.']
    },
    cuit: {
        type: Number,
        index: {unique: true},
        validate: [function(cuit){
            return typeof cuit === "number";
        }, 'El "CUIL/CUIT" debe ser sólamente un número, sin guiones (-) ni nada..']
    },
    iva: {
        type: String
    },
    tel: {
        type: Number
    },
    dir: {
        type: String
    },
    img: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

ProviderSchema.plugin(uniqueValidator, { message: 'Lo sentimos, el {PATH} ({VALUE}) ya existe. Prueba con otro?' });
ProviderSchema.plugin(deepPopulate);

module.exports = mongoose.model('Provider', ProviderSchema);