const jwt = require("jsonwebtoken");
const userDb = require("../models/userModel");
const authnticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.SECRETKEY);
        const result = await userDb.findByPk(user.userid);
        req.user = result;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ data: 'failed' });
    }
}
module.exports = authnticateUser;