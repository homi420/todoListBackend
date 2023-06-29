const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = async (req, res, JWT_SECRET) => {
    // Destructring the name password and email from req.body.
    const { name, password, email } = req.body;
    let user = await Users.findOne({ email })
    if (user) {
        return res.status(400).json({ success: false, error: "The user with this email already exists." });
    }
    else {

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt)
        user = await Users.create({
            name: name,
            password: secPass,
            email: email
        })
        let data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authToken });
    }

}
module.exports = createUser;