const express = require('express');
const cookieParser = require("cookie-parser");
const { passport } = require("./passport/serializeDeserialize");
const path = require('path');

const app = express();

app.use(express.static('client/build'));

const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(require('express-session')({
    cookie : {
    maxAge: 7200000,
    secure: false
  },
    secret: 'akuiwdy786tyfgdcxdswe4r5tyuikjio9876',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())

app.use("/api", require("./router/root"));
app.use("/api/user", require("./router/user.js"));
app.use("/api/students", require("./router/student.js"));
app.use("/api/classes", require("./router/classes.js"));

app.use("/api/*", function(req, res){
    res.status(404).send("No Route Found");
})

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/', 'index.html'));
})

app.listen(PORT, () => console.log("Lisning on port "+ PORT));

module.exports = {
    passport,
}