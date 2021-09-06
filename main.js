const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./server.js")

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("database connected");
    app.listen(process.env.PORT, ()=>console.log("server connected"))
});