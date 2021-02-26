const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const services = require("./services");
const port = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "backend connected" });
});

app.get("/api/items", async (req, res) => {
  const response = await services.getItems(req.query.q);
  res.send(response);
});

app.get("/api/items/:id", async (req, res) => {
  const response = await services.getItem(req.params.id);
  res.send(response);
});

app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

module.exports = app;
