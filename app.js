const express = require('express');
const path = require('path');
const bp = require('body-parser');
const app = express();
const listRoute = require('./routers/list');
const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.urlencoded({ extended: true }));

app.use('/', listRoute);

app.use(errorController.get404);

app.listen(3000, () => {
    console.log("Server has started on port 3000!");
}); 