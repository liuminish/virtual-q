const express = require('express');
const usersRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// route Param
usersRouter.param('userId', (req, res, next, id) => {
    db.get(`SELECT * FROM Users WHERE id=$id`, {$id: id}, (err, user) => {
        if (err) {
            next(err)
        } else {
            req.user = user;
            next()
        }
    })
})

// GET all users
usersRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Users`, (err, users) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({users: users})
        }
    })
})

// GET user
usersRouter.get('/:userId', (req, res, next) => {
    res.status(200).json(req.user)
})

// PUT/edit user
usersRouter.put('/:userId', (req, res, next) => {
    const { name, phone_number } = req.body.user;
    const sql = `UPDATE Users SET name=$name, phone_number=$phone_number WHERE id=$id`;
    const values = { $id: req.params.userId, $name: name, $phone_number: phone_number };

    if (!name || !phone_number) {
        res.sendStatus(400)
    } else {
        db.run(sql, values, (err) => {
            if (err) {
                next(err)
            } else {
                db.get(`SELECT * FROM Users WHERE id=$id`, { $id: req.params.userId }, (err, user) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).json(user)
                    }
                })
            }
        })
    }
})

module.exports = usersRouter;
