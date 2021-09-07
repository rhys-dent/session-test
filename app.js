const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const config = require("./config");

const app = express();
app.use(
	cors({
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		key: "userId",
		secret: "the-secret",
		resave: false,
		saveUninitialized: false,
		cookie: { expires: 60 * 60 * 24, secure: false },
	})
);

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/login", (req, res) => {
	console.log("Login");
	console.log(req.body);
	req.session.user = req.body;
	res.send("Logged in");
});
app.get("/login", (req, res) => {
	console.log("get /login");
	console.log(req.session.user);
	res.send(req.session.user);
});
app.listen(config.app.port, () => {
	console.log("Listening on port " + config.app.port);
});
