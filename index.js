const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("superagent");

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/callback", (req, res, next) => {
  return request
    .post("https://api.typeform.com/oauth/token")
    .field("code", req.query.code)
    .field("client_id", "HZTj8rdGhFkDFfQyZWfkRFPmBQCJ5bnjkSoqBPHM66tH")
    .field("client_secret", "EFTXokx7mzteXTazav6EjSrpduq8bEPrs4thKsx8ic5N")
    .then(r => {
      console.log("aventura");
      return res.send(r.body);
    })
    .catch(err => {
      console.error(err.body);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
