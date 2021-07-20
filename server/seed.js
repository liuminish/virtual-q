const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// creation of restaurant 1

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Restaurants'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Restaurants (password, name, address, capacity, open_time, close_time)
        VALUES ('password123', 'Restaurant A', 'Shrimps Avenue', 60, '11:00:00', '22:00:00')`
        );
    };
});

// creation of restaurant 2

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Restaurants'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Restaurants (password, name, address, capacity, open_time, close_time)
        VALUES ('password123', 'Restaurant B', 'Lobsters Avenue', 40, '11:00:00', '22:00:00')`
        );
    };
});

// creation of restaurant 3

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Restaurants'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Restaurants (password, name, address, capacity, open_time, close_time)
        VALUES ('password123', 'Restaurant C', 'Crabs Avenue', 10, '11:00:00', '22:00:00')`
        );
    };
});

// creation of user 1

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Users'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Users (name, password, phone_number)
        VALUES ('User A', 'password123', '91234567')`
        );
    };
});

// creation of user 2

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Users'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Users (name, password, phone_number)
        VALUES ('User B', 'password123', '91234567')`
        );
    };
});

// creation of user 3

db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Users'", (error, table) => {
    if (error) {
        throw new Error(error);
    }

    if (table) {
        db.run(`INSERT INTO Users (name, password, phone_number)
        VALUES ('User C', 'password123', '91234567')`
        );
    };
});
