const app = require(__dirname + "/app.js");
const mongoose = require("mongoose");
app.listen(3000, () => console.log("Server is running..."));
mongoose
  .connect("mongodb://localhost:27017/fitnessFriendDB", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to DB..."))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);
