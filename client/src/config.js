const runtimeEnv = require('@mars/heroku-js-runtime-env');

// Set env vars to those defined in .env if doing development work else use vars set in Heroku
const env = process.env.NODE_ENV !== 'production' ? runtimeEnv() : process.env.NODE_ENV;

const agentKey = !process.env.NODE_ENV ? env.REACT_APP_AGENT_KEY : process.env.REACT_APP_AGENT_KEY;

const apiId = !process.env.NODE_ENV ? env.REACT_APP_API_ID : process.env.REACT_APP_API_ID;

const appUrl = !process.env.NODE_ENV ? env.REACT_APP_URL : process.env.REACT_APP_URL;

const auth0Url = !process.env.NODE_ENV ? env.REACT_APP_CLIENT_AUTH_0_DOMAIN : process.env.REACT_APP_CLIENT_AUTH_0_DOMAIN;

let clientID = !process.env.NODE_ENV ? env.REACT_APP_CLIENT_ID : process.env.REACT_APP_CLIENT_ID;

clientID = clientID || '';

const ddsApiUrl = !process.env.NODE_ENV ? env.REACT_APP_DDS_API_URL : process.env.REACT_APP_DDS_API_URL;

const ddsProjectID = !process.env.NODE_ENV ? env.REACT_APP_DDS_PROJECT_ID : process.env.REACT_APP_DDS_PROJECT_ID;

const jwksURI = !process.env.NODE_ENV ? env.REACT_APP_JWKS_URI : process.env.REACT_APP_JWKS_URI;

const redirectUri = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/login' : `${process.env.REACT_APP_URL}login`;

const userKey = !process.env.NODE_ENV ? env.REACT_APP_AGENT_USER_KEY : process.env.REACT_APP_AGENT_USER_KEY;

export const config = {
    AGENT_KEY: agentKey,
    APP_URL: appUrl,
    API_ID: apiId,
    AUTH0_URL: auth0Url,
    CLIENT_ID: clientID,
    DDS_API_URL: ddsApiUrl,
    DDS_PROJECT_ID: ddsProjectID,
    JWKS_URI: jwksURI,
    REDIRECT_URI: redirectUri,
    USER_KEY: userKey
};