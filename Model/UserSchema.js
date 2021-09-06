const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstName: "String",
    lastName: "String",
    phoneNumber: "Number",
    emailId: {
        type: "String",
        unique: true,
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    photo: "Buffer",
    token: "String"
}, {timestamps: true});

UserSchema.statics.findByCred = async function(email, password){
    const user = await User.findOne({emailId: email});
    if(!user) {
        throw {message: "user not found", code: 404}
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw {message: "wrong password", code: 401};
    }
    return user;
}

UserSchema.methods.generateJWT = async function(){
    const token = jwt.sign({_id:this._id.toString()}, "randomsecret");
    this.token = token;
    await this.save();
    return token;
}

UserSchema.pre("save", async function(next){
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

const User = mongoose.model("User-Two", UserSchema);

module.exports = User;