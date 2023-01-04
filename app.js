const express = require('express');
const mongoose = require('mongoose');
const app = express();
const abcRoute = require('./route/abc');
const Test = require("./models/project");
var bodyParser = require('body-parser');
const cors = require('cors');
var port = process.env.PORT || 8080
app.use([bodyParser.urlencoded({extended : true}), express.json()]);
app.use(cors());

mongoose.set('strictQuery', true);

mongoose
.connect(
  "mongodb+srv://rami:1234@cluster0.38dzh5k.mongodb.net/?retryWrites=true&w=majority")
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });


app.use('/',abcRoute);


app.use((req, res) => {
    res.status(404).send("Sorry can't find that!");
});


module.exports = app;