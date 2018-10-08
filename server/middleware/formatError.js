const jwks = require('jwks-rsa');
const jwt = require('express-jwt');

formatError = (code, reason) => {
    return {
        error: code,
        reason: reason
    }
};

module.exports = formatError;