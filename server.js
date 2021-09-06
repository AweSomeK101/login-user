const express = require("express");
const cors = require("cors");
const {userRegester, userLogin, userUpdate, userList} = require("./Controller/userController");
const upload = require("./Middleware/imageUpload");
const auth = require("./Middleware/authenticate")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/regester", userRegester);
app.use("/login", userLogin);
app.use("/update", auth, upload.single("photo"), userUpdate, (error, req, res, next)=>res.status(400).send({status: "error", message: error.message}));
app.use("/all", userList);
app.use("*", (req, res)=>res.status(400).send({status: "route does not exist"}));

module.exports = app;