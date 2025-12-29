const jwt =  require("jsonwebtoken");
const { UserModel } = require("../models/user-model");
const secretkey = "e-commerce-nodejs-backend";



const userAuth = async (req, res, next) => {
    try {
    const tokenObject = req?.cookies;
    if (!tokenObject) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    } else {
        let token = tokenObject.token;
        const decodedToken = await jwt.verify(token, secretkey);
        if (!decodedToken) {
            return res.status(401).json({
                message: "Invalid token"
            });
        } else {
            const user = await UserModel.findById(decodedToken.userId);
            req.user = user;
            next();
        }
    }
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized access",
            error: error.message
        });
    }
 }

 module.exports = { userAuth };