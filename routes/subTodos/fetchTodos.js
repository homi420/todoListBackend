const Users = require("../../models/Users")
const Todos = require("../../models/Todos")

const fetchTodos = async (req, res) => {
    let id = req.user.id;
    let user = await Users.findById(id);
    let fetchedTodos = await Todos.find({ "user": id });
    if (!fetchedTodos) {
        res.status(400).json({ success: false, error: "Todos Not Found." });
    }
    else {
        res.json({ success: true, fetchedTodos });
    }
}
module.exports = fetchTodos;