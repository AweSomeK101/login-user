const jwt = require("jsonwebtoken");
const { findDocument } = require("../Model/userDAO");

async function auth(req, res, next){
    try{
    const token = req.header("Authorization").replace("Bearer ", "");
    const id = jwt.verify(token, "randomsecret");
    const data = await findDocument(id, token);
    
    if(!data) throw new Error("Unable to authenticate");
    req.tokenId=id;
    next();
    } catch (error) {
        console.log(error);
        res.status(403).send({message: "Invalid Authentication", status: "error"})
    }
}

module.exports = auth;