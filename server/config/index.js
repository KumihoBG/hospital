module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION_STRING: 'mongodb://localhost:27017/newlife-hospital',
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    COOKIE_NAME: 'Session_Token',
}