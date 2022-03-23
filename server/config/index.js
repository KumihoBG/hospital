module.exports = {
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: process.env.MONGO_DB,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    COOKIE_NAME: process.env.SESSION_TOKEN_NAME,
}