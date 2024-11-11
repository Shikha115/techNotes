
//url allowed to make request to backend
const allowedOrigins = [
    `http://localhost:${process.env.PORT}`,
    `http://localhost:5000`,
]

module.exports = allowedOrigins;