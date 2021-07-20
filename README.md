# Readme for Technical Challenge

## Problem (Health and Safety in Public Places)

Despite safe distancing measures being put in place, some F&B establishments have trouble maintaining the required distance between patrons due to lack of space outside these establishments.

## Solution

A virtual queue system that allows people to queue for restaurants without being physically there, therefore reducing crowds outside of restaurants.

## Technology
### SQLite, Express.js, React.js, NodeJS
- Full javascript stack, hence developers would only need to be proficient in one language
- SQLite is a lightweight DBMS with simple operations and minimal design which is fast yet fits the requirements of a simple virtual queue system.
- Open-sourced framework backed by community support
## Steps to run demo
### Starting up the server
`cd server` to enter the server directory\
`node migration` to run migration file for database\
`node seed` to run seed file for database\
`node server` to start server
### Running the app
`npm start` in the main directory to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### Logging in as restaurant
Click `log in` on the top right corner.

Type: restaurant\
ID: 1 (Can be either 1, 2 or 3)\
Password: this does not matter for the demo

Click `LOG IN` to log in and see restaurant main page, which consists of restaurant details and current queue numbers.

To close any queue numbers, click on `close`.
### Logging in as user
Click `log in` on the top right corner.

Type: user\
ID: 1 (Can be either 1, 2 or 3)\
Password: this does not matter for the demo

Click `LOG IN` to log in and see user's main page, which consists of user's details and current queue numbers.

To cancel any queue numbers, click on `cancel`.\
To get new queue numbers, go to restaurant list.
### Viewing restaurant list and getting queue number
Click on top left icon to view list of restaurants.\
Click `Generate` to obtain queue number.\
If user is not logged in, he will be redirected to log in page.
## Future Enhancements
### SSO log in features
- Authenticate user/restaurant logins with tools such as Auth0.
- Creation of user/restaurant accounts

