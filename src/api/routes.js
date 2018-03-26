const providerController = require('./controllers/provider_controller');
const entityController = require('./controllers/entity_controller');
const imgController = require('./controllers/img_controller');

module.exports = function (express) {

	const router = express.Router();

	// params
    router.param('providerId', providerController.load);
    router.param('entityId', entityController.load);

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

    // img upload
    router.post('/img/upload', imgController.uploadImg);

    return router;
};
