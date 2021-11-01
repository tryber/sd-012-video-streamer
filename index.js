const express = require('express');
const home = require('./home');
const stream = require('./stream');

const app = express();

app.get('/home', home);
app.get('/video', stream);

app.listen(3000, () => console.log('App running on port 3000'));
