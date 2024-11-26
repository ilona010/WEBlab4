const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const PORT = 3000;
const db = 'mongodb://localhost:27017/lab4';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(error => console.log(error));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const subscriberRoutes = require('./routes/subscriberRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
app.use(subscriberRoutes);
app.use(newsletterRoutes);

app.listen(PORT, (error) =>
    error ? console.log(error) : console.log(`Listening on port ${PORT}`)
);
