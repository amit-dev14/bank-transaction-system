require("dotenv").config();
const app = require("./src/app");
const ConnectDatabase = require("./src/database/db");
ConnectDatabase();

const ports = process.env.PORT;
// app.listen(8080, "127.0.0.1", () => {
//   console.log("SERVER ACTUALLY STARTED");
// });
app.listen(ports, () => {
  console.log(`Server is running on port : ${ports}`);
});
