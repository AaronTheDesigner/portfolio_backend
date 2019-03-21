//Packages
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

//Imports
const schema = require("./graphql/schema/index");

// app
const app = express();

//database
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@ds331145.mlab.com:31145/${process.env.MONGO_DB}`,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.get("/", function(req, res) {
  res.send("GraphiQL Deployment for Portfolio.");
});

//allow cross-origin requests
app.use(cors());

app.listen(process.env.PORT || 5000, () => {
  console.log("App listening");
});
