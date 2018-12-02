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
      client_id: "3nbjBd6tNZX51HVDZgfRSEQ6ATCE7s6vC4Zw5VZe23qB",
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "http://localhost:5000/callback"
    })
    .then(r => {
      console.log(r.body)
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
