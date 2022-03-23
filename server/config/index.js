module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION_STRING: 'mongodb+srv://kumiho:Q2yTXX7eEN4mxmGH@newlifehospital.i1jmr.mongodb.net/NewLifeHospital?retryWrites=true&w=majority',
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    COOKIE_NAME: 'Session_Token',
}