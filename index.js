const app = require("./app");
const connectWithDB = require("./config/db");
require("dotenv").config();

//connect to Database
connectWithDB();

//staring server
app.listen(process.env.PORT, () => {
  console.log("Server running at PORT : ", process.env.PORT);
});
