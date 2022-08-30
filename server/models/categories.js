const categories = require('express').Router();
const connection = require('../db-config');

categories.post('/', (req, res) => {
    const {category} = req.body;
    connection.query(
        'INSERT INTO categories (category) VALUES (?)',
        [category],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error saving category');
                const id = results.insertId;
                const createdCategory = {
                    id,
                    category
                };
                res.status(201).json(createdCategory);
            }
        }
    );
});

categories.put('/', (req, res) => {
    const {category, id} = req.body;
    connection.query('UPDATE categories SET category = ? WHERE id = ?', [category, id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error updating category');
            } else {
                res.status(200).json(results);
            }
        });
});

categories.get('/', (req, res) => {
    connection.query('SELECT * FROM categories INNER JOIN products WHERE categories.id = products.categories_id',
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting category');
            } else {
                res.status(200).json(results);
            }
        });
});


categories.get('/:id', (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM categories INNER JOIN products ON categories.id = products.categories_id WHERE categories.id = ?', [id],
        (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting category');
            } else {
                res.status(200).json(results);
            }
        });
});


module.exports = categories;
