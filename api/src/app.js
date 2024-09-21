const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors'); // Import cors middleware
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

// Configure CORS
const corsOptions = {
  origin: ['https://dogs-appv3.vercel.app', 'https://dogs-appv3-r3yj.vercel.app'], // Specific origins
  credentials: true, // Allow cookies and credentials
};

server.use(cors(corsOptions)); // Use cors with specified options
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Routes
server.use('/dogsapp', routes);

// Error catching middleware
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
