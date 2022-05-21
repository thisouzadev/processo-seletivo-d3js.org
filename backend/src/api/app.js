const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes');
const err = require('../middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use(err);

module.exports = app;
