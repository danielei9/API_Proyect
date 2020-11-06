'use strict'

const express = require('express');
const bodyParser = require('body-parser'); // libreria para que se actualice el servidor según el desarrollo
const app = express();
const api = require('./routes/router')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api',api)

module.exports = app
