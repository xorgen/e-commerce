const products = require('express').Router();
const connection = require('../db-config');

products.post('/', (req, res) => {
    const {product_name, description, image, quantity, unit_price, create_time, categories_id} = req.body;
    connection.query(
        'INSERT INTO products (product_name, description, image, quantity, unit_price, create_time, categories_id) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 2)',
        [product_name, description, image, quantity, unit_price, create_time, categories_id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error saving product');
            } else {
                const id = result.insertId;
                const createdProduct = {
                    id,
                    product_name,
                    description,
                    image,
                    quantity,
                    unit_price,
                    create_time,
                    categories_id
                };
                res.status(201).json(createdProduct);
            }
        }
    );
});

products.get('/', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error getting product');
        } else {
            res.status(200).json(results);
        }
    });
});

products.get('/:id', (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM products WHERE id = ?',
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting category');
            } else {
                res.status(200).json(results);
            }
        });
});


module.exports = products;