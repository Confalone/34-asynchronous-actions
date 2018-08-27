'use strict';

require('dotenv').config();

require('babel-register');

// Start up DB Server
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

require('./src/app.js').start(process.env.PORT);