// backend/src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");


const v1Router = require("./api/v1/routes/index.route");

const app = express();

// 1. Middleware Setup
app.use(logger(process.env.MORGAN_LOG_FORMAT || "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors({
  origin: '*', 
  credentials: true
}));

// 3. Routes

app.use("/api/v1", v1Router); 

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Sweet Shop API is running' });
});

// 4. Error Handling (404 Not Found)
app.use((req, res, next) => {
  next(createError(404));
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      stack: isDev ? err.stack : undefined 
    }
  });
});

module.exports = app;