const express = require('express');
const restaurantsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
restaurantsRouter.param('restaurantId', (req, res, next, id) => {

    db.get(`SELECT * FROM Restaurants WHERE id=$id`, {$id: id}, (err, restaurant) => {

        if (err) {
            next(err)
        } else {
            req.restaurant = restaurant;
            next()
        }
    })
})

// GET all restaurants
restaurantsRouter.get('/', (req, res, next) => {

    if (req.query) {
        const name = req.query.name ? req.query.name : '';

        // name search
        const sql = `SELECT * FROM Restaurants WHERE name LIKE '%${name}%'`;

        db.all(sql, (err, restaurants) => {
            if (err) {
                next(err)
            } else {
                res.status(200).json(restaurants)
            }
        })
    }

    // no search
    else {
        db.all(`SELECT * FROM Restaurants`, (err, restaurants) => {

            if (err) {
                next(err)
            } else {
                res.status(200).json(restaurants)
            }

        })
    }

})

// GET restaurant
restaurantsRouter.get('/:restaurantId', (req, res, next) => {
    res.status(200).json(req.restaurant)
})

// POST/add restaurant
restaurantsRouter.post('/', (req, res, next) => {

    const { name, password, address, capacity, open_time, close_time } = req.body.restaurant;
    const sql = `INSERT INTO Restaurants (name, password, address, capacity, open_time, close_time) VALUES ($name, $password, $address, $capacity, $open_time, $close_time)`;
    const values = { $name: name, $password: password, $address: address, $capacity: capacity, $open_time: open_time, $close_time: close_time};

    if (!name || !password || !address || !capacity || !open_time || !close_time) {
        res.sendStatus(400)
    } else {
        db.run(sql, values, function (err) {

            if (err) {
                next(err)
            } else {
                // retrieving last restaurant
                db.get(`SELECT * FROM Restaurants WHERE id=$id`, { $id: this.lastID }, function (err, restaurant) {
                    if (err) {
                        next(err)
                    } else {
                        res.status(201).json({ restaurant: restaurant });
                    }
                })
            }
        })
    }

})

// PUT/update restaurant
restaurantsRouter.put('/:restaurantId', (req, res, next) => {

    const { name, address, capacity } = req.body.restaurant;
    const sql = `UPDATE Restaurants SET name=$name, address=$address, capacity=$capacity WHERE id=$id`;
    const values = { $id: req.params.restaurantId, $name: name, $address: address, $capacity: capacity };

    if (!name || !address || !capacity ) {
        res.sendStatus(400)
    } else {
        db.run(sql, values, (err) => {
            if (err) {
                next(err)
            } else {
                db.get(`SELECT * FROM Restaurants WHERE id=$id`, { $id: req.params.restaurantId }, (err, restaurant) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).json(restaurant)
                    }
                })
            }
        })
    }
})


module.exports = restaurantsRouter;
