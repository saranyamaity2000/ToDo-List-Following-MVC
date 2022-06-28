const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const bp = require('body-parser');
const app = express();
const listRoute = require('./routers/list');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const Task = require('../models/task');

const DATABASE_NAME = "ToDoList";
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const DB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.2qntt4u.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
const localDB = `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;
// mongod --config /opt/homebrew/etc/mongod.conf --fork

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({ extended: true }));

app.use('/', listRoute);

app.use(errorController.get404);

setInterval(() => {
    const conditions = {};
    Task.find(conditions, (err, foundTasks) => {
        if (err) {
            res.send("Sorry! Something went wrong! while retrieving tasks!");
        } else {
            for(let task of foundTasks) {
                
            }
        }
    });
}, 60000);

mongoose.connect(localDB, { useNewUrlParser: true })
    .then(result => {
        app.listen(3000, () => {
            console.log("Server has started on port 3000!");
        });
    }).catch(err => {
        console.log("Error: " + err);
    });     