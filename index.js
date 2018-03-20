const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("superagent");

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/callback", (req, res, next) => {
  return request
    .post("https://api.typeform.com/oauth/token")
    .type("form")
    .send({
      code: req.query.code,
      client_id: "HZTj8rdGhFkDFfQyZWfkRFPmBQCJ5bnjkSoqBPHM66tH",
      client_secret: "EFTXokx7mzteXTazav6EjSrpduq8bEPrs4thKsx8ic5N",
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
