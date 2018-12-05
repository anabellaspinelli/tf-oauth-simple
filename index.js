const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("superagent");

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/redirect", (req, res, next) => {
  return request
    .post("https://api.typeform.com/oauth/token")
    .type("form")
    .send({
      code: req.query.code,
      client_id: "91u9WDHqQfkU5QcEuF9khYV14saKUZKUGZMAZyHDfbfu",
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "http://localhost:5000/redirect"
    })
    .then(r => {
      return request
        .get('https://api.typeform.com/me')
        .set({
          Authorization: `Bearer ${r.body.access_token}`
        })
        .then(meRes => meRes)
    })
    .then(r => {
      return res.send(`
        <p style="font-size: 20px;">Hello ${r.body.alias}!!

        Your profile data is:
        <pre style="color: green; font-size: 20px;">${
        JSON.stringify(r.body, ' ', 4)
        }</pre></p>
      `);
    })
    .catch(err => {
      console.error(err);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
