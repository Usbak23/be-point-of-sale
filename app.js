const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./app/api/auth/router');
const categoriesRouter = require('./app/api/categories/router');
const barangRouter = require('./app/api/barang/router');
const uploadsRouter = require('./app/api/uploads/router');
const checkoutRouter =require('./app/api/checkout/router')
const transactionsRouter = require('./app/api/transactions/router');

const URL = '/api/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome To TOKO PARIGI' })
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoriesRouter);
app.use(`${URL}`, barangRouter);
app.use(`${URL}`, uploadsRouter);
app.use(`${URL}`, checkoutRouter);
app.use(`${URL}`, transactionsRouter);

module.exports = app;
