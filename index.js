//Packages
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Imports
const schema = require("./graphql/schema/index");

// app
const app = express();

//allow cross-origin requests
app.use(cors());

app.get("/", (req, res) => {
  res.send("GraphiQL Deployment for Portfolio Website");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@ds331145.mlab.com:31145/${process.env.MONGO_DB}`
  )
  .then(() => {
    app.listen(3000);
    console.log("Database connected... ");
    console.log("App listening on Port 3000...");
  })
  .catch(err => {
    console.log(err);
  });
