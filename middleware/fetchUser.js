const jwt = require("jsonwebtoken");
let JWT_SECRET = "1qqaws2e4r983498dfjidf098349idfjoi34098df9ioi";
const fetchUser = async (req, res, next) => {
    const authToken = req.header("authToken");
    if (!authToken) {
        res.status(401).json({ success: false, error: "Please Authenticate using the valid token." });
    }
    else {
        const data = jwt.verify(authToken, JWT_SECRET);
        if (!data) {
            res.status(401).json({ success: false, error: "Please Authenticate using the valid token." });
        }
        req.user = data.user;
    }
    next();
}
module.exports = fetchUser;