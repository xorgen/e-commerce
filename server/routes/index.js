const categories = require('../models/categories');
const products = require('../models/products');

const setUpRoutes = (app) => {
    app.use('/api/categories', categories);
    app.use('/api/products', products);
};

module.exports = {setUpRoutes};
