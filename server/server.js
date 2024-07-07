require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utility/db");
const errorMiddleware = require ("./middleware/error-middleware.js");
const authRoute = require ("./router/auth-router.js");
const serviceRoute = require("./router/service-router");
const contactRoute = require ("./router/contact-router.js");
const adminRoute = require ("./router/admin-router.js");
const dotenv = require('dotenv');



const cors = require ("cors");

// handling cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
// Middleware
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);


app.use(errorMiddleware);
const PORT = process.env.PORT || dotenv;
// const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${PORT}`);
    });
});
