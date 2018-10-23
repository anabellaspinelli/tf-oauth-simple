const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("superagent");

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/callback", (req, res, next) => {
  console.log("callback");

  return request
    .post("https://api.typeform.com/oauth/token")
    .type("form")
    .send({
      code: req.query.code,
      client_id: "7k5Lrifr1qVAWnZ6CvWBrJjgPvLkjwL3Z5JMSoAvCjTw",
      client_secret: "abcabcabc",
      redirect_uri: "https://typeform-js-oauth.herokuapp.com/callback"
    })
    .then(r => {
      return res.send(`
        <p>Your token is <span style="color: green">${
          r.body.access_token
        }</span></p>
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
