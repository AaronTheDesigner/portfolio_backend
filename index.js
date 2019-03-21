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
    `mongodb+srv://Aaron:gokuh123@cluster0-ddfcp.mongodb.net/portfolio_graph_backend?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
    console.log("Database connected... ");
    console.log("App listening on Port 3000...");
  })
  .catch(err => {
    console.log(err);
  });
