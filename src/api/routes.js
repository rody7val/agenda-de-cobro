// Controllers
const providerController = require('./controllers/provider_controller');

module.exports = function (express) {

	const router = express.Router();

    // router.param('itemId', itemController.load);

    router.post('/provider/new', providerController.new);
    // router.post('/item/new', sessionController.loginRequired, itemController.create);
    // router.get('/item/:itemId', sessionController.loginRequired, itemController.show);

    return router;
};
