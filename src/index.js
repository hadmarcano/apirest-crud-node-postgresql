const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

// import routes
const userRoutes = require("../routes/user.js");

// import middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json()); // Acepta data en formato json
app.use(bodyParser.urlencoded({ extended: false })); // NO acepta datos complejos(imagenes), solo datos simples desde formularios HTML.
app.use(morgan("dev"));

// Routes

app.use("/api", userRoutes);

// DB modern connection

// Routes-Middlewares

// PORT
const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
