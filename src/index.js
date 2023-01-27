const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./routes/routes");
const app = express();

app.use(express.json());
mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://tannmayhedau619:Tanmay%40619@cluster0.fw1xhuw.mongodb.net/jwt-based-authentication-system",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb is connected"))
  .catch((error) => console.log(error));

app.use("/", router);

app.listen(3000, () => {
  console.log("express app running on port 3000");
});
