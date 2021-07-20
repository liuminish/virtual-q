const express = require('express');
const path = require('path')
const queueRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route param for queue number
queueRouter.param('queueId', (req, res, next, id) => {
    db.get(`SELECT * FROM QueueNumbers WHERE id=$id`, {$id: id}, (err, queue) => {
        if (err) {
            res.sendStatus(404)
        } else if (!queue) {
            res.sendStatus(404)
        } else {
            req.queue = queue;
            next()
        }
    })
})

// POST/create queue number
queueRouter.post('/', (req, res, next) => {
    const { restaurant_id, user_id, number, pax, date_time } = req.body.queue;
    const sql = `INSERT INTO QueueNumbers (restaurant_id, user_id, number, pax, date_time) VALUES ($restaurant_id, $user_id, $number, $pax, $date_time)`;
    const values = { $restaurant_id: restaurant_id, $user_id: user_id, $number: number, $pax: pax, $date_time: date_time };

    if (!restaurant_id || !user_id || !number || !pax || !date_time ) {
        res.sendStatus(400)
    } else {
        db.run(sql, values, function(err) {
            if (err) {
                next(err)
            } else {
                // retrieving last posted queue number
                db.get(`SELECT * FROM QueueNumbers WHERE id=$id`, {$id: this.lastID}, function(err, queue) {
                    if (err) {
                        next(err)
                    } else {
                        res.status(201).json(queue);
                    }
                })
            }
        })
    }
})

// PUT/edit queue number
queueRouter.put('/:queueId', (req, res, next) => {

    if (req.body.queue.is_cancelled) {
        const sql = `UPDATE QueueNumbers SET is_cancelled=1`;

        db.run(sql, (err) => {
            if (err) {
                next(err)
            } else {
                db.get(`SELECT * FROM QueueNumbers WHERE id=$id`, { $id: req.params.queueId }, (err, queue) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).json(queue)
                    }
                })
            }
        })
    } else if (req.body.queue.is_current) {
        const sql = `UPDATE QueueNumbers SET is_current=0`;

        db.run(sql, (err) => {
            if (err) {
                next(err)
            } else {
                db.get(`SELECT * FROM QueueNumbers WHERE id=$id`, { $id: req.params.queueId }, (err, queue) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).json(queue)
                    }
                })
            }
        })
    }
})

// GET all queue numbers
queueRouter.get('/', (req, res, next) => {
    if (req.query.user_id) {
        const sql = `SELECT * FROM QueueNumbers LEFT OUTER JOIN Restaurants on QueueNumbers.restaurant_id = Restaurants.id WHERE user_id=$user_id`;
        const values = { $user_id: req.query.user_id }

        db.all(sql, values, (err, queueNumbers) => {
            if (err) {
                next(err)
            } else {
                res.status(200).json(queueNumbers)
            }
        })
    } else if (req.query.restaurant_id) {
        const sql = `SELECT * FROM QueueNumbers LEFT OUTER JOIN Users on QueueNumbers.user_id = Users.id WHERE restaurant_id=$restaurant_id`;
        const values = { $restaurant_id: req.query.restaurant_id }

        db.all(sql, values, (err, queueNumbers) => {
            if (err) {
                next(err)
            } else {
                res.status(200).json(queueNumbers)
            }
        })
    }

})


module.exports = queueRouter;
