const express = require('express');
const home = require('./home');
const stream = require('./stream');
const process = require('process');

const app = express();

app.get('/home', home);
app.get('/video', stream);

app.listen(process.env.PORT, () => console.log('App running'));
