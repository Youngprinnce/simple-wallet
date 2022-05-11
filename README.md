# Simple Wallet
A simple backend application that allows user's signup and perform basic transactions on their account.

## Features
- A user can create an account
- A user can fund their account
- A user can transfer funds to another user’s account
- A user can withdraw funds from their account.

### Dev Tools
- Nodejs/ExpressJS
- Mocha
- KnexJs
- MySQL

### How to setup project on your local machine
#### Pre-requisite
- [Node.js](https://nodejs.org/en/)
- [Xampp](https://www.apachefriends.org/download.html)

#### Installing 
- Clone the repository. Run ```git clone https://github.com/Youngprinnce/simple-wallet.git``` in your terminal
- CD into the project folder
- Rename .env.example to .env
- Launch the Xampp application
- Click on the start button for Apache and MySQL
- Click [here](http://localhost/phpmyadmin/index.php) to create database with name ```lendsqr_dev``` and ```lendsqr_test```

##### N:B
If you have a password and user for your MySQL database, follow the instruction below
- Open the project folder
- Select the ```src``` folder, then select the ```database``` folder
- In the ```database``` folder you'll find a file with name ```knexfile.js```
- Open the file and replace root with your database user name, add the password if you have

#### Open your terminal
- Run `npm install` 

#### Run the migration
- Run `npm run migration:dev`
- Run `npm run migration:test`

#### Run test cases
- Run `npm test`

#### Run the linter
- Run `npm run lint`

#### Run the app
- Run `npm run dev`

### Documentation (localhost)
- Click [here](http://localhost:5000/docs) to test to the application
