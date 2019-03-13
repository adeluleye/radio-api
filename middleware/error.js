const winston = require('winston');

module.exports = function(err, req, res, next) {
    // Also log the exception
    //Logging levels: error = L0, warn = L1, info = L2, verbose = L3, debug = L4, silly = L5
    //winston.log('error', err.message);
    //console.log(err);
    winston.error(err.message, err);
    res.status(500).send('Something failed.');
}