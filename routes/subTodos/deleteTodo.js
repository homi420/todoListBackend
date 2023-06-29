const Todos = require("../../models/Todos")
const deleteTodo = async (req, res) => {
    let id = req.user.id;
    let reqId = req.params.id;
    let todo = await Todos.findById(reqId);
    if (!todo) {
        res.status(400).json({ success: false, error: "Todo Not Found!" });

    }
    if (todo.user.toString() !== id) {
        res.status(400).json({ success: false, error: "Not Allowed" });
    }
    todo = await Todos.findByIdAndDelete(reqId);
    res.json({ success: true, todo });

}
module.exports = deleteTodo;