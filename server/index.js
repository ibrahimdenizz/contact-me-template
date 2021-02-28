const sendMail = require("./routers/sendMail");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/send", sendMail);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
