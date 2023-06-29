const Todos = require("../../models/Todos")
const updateTodo = async (req, res) => {
    const { title, description } = req.body;
    const id = req.user.id;
    const reqId = req.params.id;
    let newTodo = {};
    if (title) {
        newTodo.title = title;
    }
    if (description) {
        newTodo.description = description;
    }
    let todo = await Todos.findById(reqId);
    if (!todo) {
        res.status(400).json({ success: false, error: "Todo Not Found!" })
    }
    if (id !== todo.user.toString()) {
        res.status(400).json({ success: false, error: "Not Allowed!" });

    }
    todo = await Todos.findByIdAndUpdate(reqId, { $set: newTodo }, { new: true })
    res.json({ success: true, todo });
}
module.exports = updateTodo