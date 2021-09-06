const {createDocument, createToken, updateDocument, findAllDocument} = require("../Model/userDAO");

async function userRegester(req, res){
    try {
        const data = await createDocument(req.body);
        if(data && data.status) return res.status(400).send(data);
        res.status(201).send(data);
    } catch (error) {
        console.log("user regester", error);
        res.status(500).send({status: "error"});
    }
}

async function userLogin(req, res){
    try{
        const data = await createToken(req.body.emailId, req.body.password);
        if(data && data.status) return res.status(data.code).send({status: data.status, message: data.message});
        res.status(201).send({token: data}); 
    } catch(error) {
        console.log("user login", error);
        res.status(500).send({status: "error"});
    }
}

async function userUpdate(req, res){
    try {
        const data = await updateDocument(req.file, req.body, req.tokenId);
        if(data && data.status) return res.status(400).send(data);
        res.status(201).send(data);
    } catch (error) {
        console.log("user update", error);
        res.status(500).send({status: "error"});
    }
}

async function userList(req, res){
    try{
        const data = await findAllDocument();
        if(data && data.status) return res.status(400).send(data);
        res.send(data);
    } catch (error) {
        console.log("user update", error);
        res.status(500).send({status: "error"});
    }
}

module.exports = {userRegester, userLogin, userUpdate, userList};