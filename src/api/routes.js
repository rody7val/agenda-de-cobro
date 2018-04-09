const providerController = require('./controllers/provider_controller');
const clientController = require('./controllers/client_controller');
const entityController = require('./controllers/entity_controller');

const imgController = require('./controllers/img_controller');

const pagoController = require('./controllers/pago_controller');

module.exports = function (express) {

	const router = express.Router();

	// params
    router.param('providerId', providerController.load);
    router.param('clientId', clientController.load);
    router.param('entityId', entityController.load);
    router.param('pagoId', pagoController.load);

    // providers
    router.get('/provider', providerController.all);
    router.post('/provider/new', providerController.new);
    router.get('/provider/:providerId', providerController.getOne);
    router.post('/provider/:providerId/edit', providerController.edit);
    router.post('/provider/:providerId/delete', providerController.delete);

    // entity
    router.get('/entity', entityController.all);
    router.post('/entity/new', entityController.new);
    router.get('/entity/count', entityController.count);
    router.get('/entity/:entityId', entityController.getOne);
    router.post('/entity/:entityId/edit', entityController.edit);
    // router.post('/entity/:entityId/delete', entityController.delete);

    // client
    router.get('/client', clientController.all);
    router.post('/client/new', clientController.new);
    router.get('/client/:clientId', clientController.getOne);
    router.post('/client/:clientId/edit', clientController.edit);
    router.post('/client/:clientId/delete', clientController.delete);

    // pago
    router.get('/pago', pagoController.all);
    router.post('/pago/new', pagoController.new);
    router.get('/pago/:pagoId', pagoController.getOne);
    router.get('/pago/type/:type/', pagoController.findByType);
    router.post('/pago/:pagoId/edit', pagoController.edit);
    router.post('/pago/:pagoId/delete', pagoController.delete);

    // img upload
    router.post('/img/upload', imgController.uploadImg);

    return router;
};
