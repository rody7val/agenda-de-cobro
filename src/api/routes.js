const providerController = require('./controllers/provider_controller');
const imgController = require('./controllers/img_controller');

module.exports = function (express) {

	const router = express.Router();

    router.param('providerId', providerController.load);

    router.get('/provider', providerController.all);
    router.post('/provider/new', providerController.new);
    router.get('/provider/:providerId', providerController.getOne);
    router.post('/provider/:providerId/edit', providerController.edit);
    router.post('/provider/:providerId/delete', providerController.delete);

    router.post('/img/upload', imgController.uploadImg);

    return router;
};
