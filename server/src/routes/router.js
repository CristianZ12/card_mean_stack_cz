const express = require('express');
const router = express.Router();

const controllers = require('../controllers/routerControllers');

module.exports = (app) => {

    router.get('/', controllers.main);
    router.get('/api/cards', controllers.getCard);
    router.post('/api/cards', controllers.addCard);
    router.get('/api/cards/:id', controllers.getCardById);
    router.put('/api/cards/:id', controllers.updateCard);
    router.delete('/api/cards/:id', controllers.deleteCard);

    app.use(router);
}