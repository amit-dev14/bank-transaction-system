const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const accountRouter = require("./routes/account.routes")

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());


app.use("/api/auth", authRouter);

app.use("/api/accounts",accountRouter)

module.exports = app;
