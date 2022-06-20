const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const async = require("async");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mailchimp.setConfig({
  apiKey: "69029e6d819673e4faee4c176a887e5b-us14",
  server: "us14",
});


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const listId = "3e5ece2f24";

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      });
      res.sendFile(__dirname + "/success.html");
      console.log("Successfully added contact as an audience member.");
    } catch (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    }
  }
  run();
});


app.post("/failure", function(req, res) {
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000");
});


// Audience ID
// 3e5ece2f24


// API Key
// 69029e6d819673e4faee4c176a887e5b-us14
