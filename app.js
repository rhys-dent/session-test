const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const flash = require("express-flash");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { webConfig } = require("./config");
const initializePassport = require("./passport-config");

initializePassport(
	passport,
	(email) => users.find((user) => user.email === email),
	(id) => users.find((user) => user.id === id)
);

const users = [];

const app = express();
app.use(
	cors({
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: false }));

app.use(flash());
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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "client/build")));

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/fail",
	})
);
app.get("/login", (req, res) => {
	console.log("get /login");
	console.log(req.user);
	res.send(req.user);
});
app.post("/register", async (req, res) => {
	try {
		users.push({
			id: Date.now().toString(),
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10),
		});
		res.redirect("/");
	} catch (err) {
		res.redirect("/fail");
	}
	console.log(users);
});
app.get("(/*)?", async (req, res, next) => {
	console.log("/* ?");
	res.sendFile(path.join(path.join(__dirname, "client/build"), "index.html"));
});
app.listen(webConfig.app.port, () => {
	console.log("Listening on port " + webConfig.app.port);
});
