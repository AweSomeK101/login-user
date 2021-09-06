const User = require("./UserSchema");

async function createDocument(data){
    const {firstName, lastName, phoneNumber, emailId, password} = data;
    try{
        const user = new User({firstName, lastName, phoneNumber, emailId, password});
        return await user.save();
    } catch(error) {
        console.log("create document", error);
        return {status: "error", message: error.message};
    }
}

async function createToken(email, password){
    try {
        const user = await User.findByCred(email, password);
        const token = await user.generateJWT();
        return token;
    } catch (error) {
        console.log("create token", error);
        return {status: "error", ...error};
    }
}

async function findDocument(id, token){
    try {
        return await User.findOne({id,token});
    } catch (error) {
        console.log("findDocument error ", error);
        throw new Error(error.message);
    }
}

async function updateDocument(file, body, id){
    try {
        const user = await User.findById(id);
        const allowed = ["firstName", "lastName", "emailId", "password", "phoneNumber"];
        if(body){
            allowed.forEach(update => {
                if(body[update]){
                    user[update] = body[update];
                }
            });
        }
        if(file) user.photo = file.buffer;
        return await user.save();
    } catch (error) {
        console.log("update document", error);
        return {status: "error", message: error.message};
    }
}

async function findAllDocument(){
    try{
        const data = await User.find({});
        if(!data) return {code: 404, message: "no user found"};
        return data
    } catch (error) {
        console.log("find all document", error);
        return {status: "error", message: error.message};
    }
}

module.exports = {createDocument, createToken, findDocument, updateDocument, findAllDocument};