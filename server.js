const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");



const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const uri = "mongodb+srv://Chase-Rivera:Washington100!@cluster0.oiykj.mongodb.net/BudgetDB?retryWrites=true&w=majority";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});