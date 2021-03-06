'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const port = process.env.PORT || 6969;
const path = require('path');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.disable('x-powered-by');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

    default:
}

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', './index.html'));
});

app.use((_req, res) => {
  res.sendStatus(404);
})

app.use((err, _req, res, _next) => {
  if (err.status || err.output && err.output.statusCode) {
    return res.status(err.status || err.output.statusCode).send(err);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port,', port);
});

module.exports = app;
