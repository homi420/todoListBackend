const express = require("express")
const Users = require("../models/Users")
const createUser = require("./subAuth/createUser")
const login = require("./subAuth/login");
const router = express.Router()
const fetchUser = require("../middleware/fetchUser");
let JWT_SECRET = "1qqaws2e4r983498dfjidf098349idfjoi34098df9ioi";

const ev = require("express-validator");
router.post("/createUser", [ev.body("name", "The name's length can not be less than 3").isLength({ min: 3 }), ev.body("password", "The password length can not be less than 8").isLength({ min: 8 }), ev.body("email", "Email you entered is not valid.").isEmail()], async (req, res) => {
    try {
        const errors = ev.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() })
        }
        else {
            createUser(req, res, JWT_SECRET);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error!" });
    }
})
router.post("/login", [
    ev.body("password", "Please Enter Your Password.").exists(), ev.body("email", "Please Enter The Valid Email Address.").isEmail()
], (req, res) => {
    try {

        const errors = ev.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() });
        }
        else {
            login(req, res, JWT_SECRET);
        }
    }

    catch {
        res.status(500).json({ success: false, error: "Internal Server Error." })
    }
})
router.get("/getUser", fetchUser, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await Users.findById(id).select("-password")
        res.json(user)
    }
    catch {
        res.status(500).json({ success: false, error: "Internal Server Error." })
    }
})
module.exports = router;