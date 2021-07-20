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

module.exports = usersRouter;
