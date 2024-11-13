
//url allowed to make request to backend
const allowedOrigins = [
    `http://localhost:${process.env.PORT}`,
    `http://localhost:5500`,
    `http://localhost:5173`,
]

module.exports = allowedOrigins;