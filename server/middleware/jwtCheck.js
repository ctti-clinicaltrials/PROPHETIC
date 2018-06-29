const jwks = require('jwks-rsa');
const jwt = require('express-jwt');

module.exports.check = () => {
    return jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: process.env.REACT_APP_JWKS_URI
        }),
        audience: process.env.REACT_APP_API_ID,
        issuer: process.env.REACT_APP_AUTH0,
        algorithms: ['RS256']
    });
};