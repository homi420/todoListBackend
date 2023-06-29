const Todos = require("../../models/Todos");
const addTodo = async (req, res) => {

    let id = req.user.id;


    const { title, description } = req.body;
    let todo = await Todos.create({
        title: title,
        description: description,
        user: id,

    });
    res.json({ success: true, todo });
}
module.exports = addTodo;