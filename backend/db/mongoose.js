const mongoose = require("mongoose");
const USERNAME = "sacrypanda";
const PASSWORD = "pankaj123";

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.75lge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

try {
  mongoose.connection
    .on("error", (err) => {
      console.error(err);
    })
    .on("open", (err) => {
      console.log(`DB connected`);
    });

  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  console.log(err);
}
