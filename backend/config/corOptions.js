const allowedOrigins = require("./allowedOrigins");

var corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin:", origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) callback(null, true); //error object, boolean
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//now go to ggogle and try to make a request to backend, with fetch("http://localhost:8000/index") and see the error
//remove coroptions from server.js and and it will work

//!origin ||  = if backend and frontend is on same domain, then origin will be undefined

module.exports = corsOptions;
