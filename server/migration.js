const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Restaurants`)
    db.run(`CREATE TABLE Restaurants (
        id INTEGER NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        open_time TIME 'HH24:MI:SS',
        close_time TIME 'HH24:MI:SS',
        PRIMARY KEY (id)
        )`)
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS Users`)
    db.run(`CREATE TABLE Users (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        phone_number INTEGER NOT NULL,
        PRIMARY KEY (id)
        )`)
})

db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS QueueNumbers`)
    db.run(`CREATE TABLE QueueNumbers (
        id INTEGER NOT NULL,
        number TEXT NOT NULL,
        pax INTEGER NOT NULL,
        date_time DATETIME NOT NULL,
        is_current BOOLEAN DEFAULT TRUE,
        is_cancelled BOOLEAN DEFAULT FALSE,
        restaurant_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        PRIMARY KEY (id)
        FOREIGN KEY (restaurant_id) REFERENCES Restaurants (id)
        FOREIGN KEY (user_id) REFERENCES Users (id)
        )`)
})
