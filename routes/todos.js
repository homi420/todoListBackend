const express = require("express");
const router = express.Router()
const ev = require("express-validator")
const fetchUser = require("../middleware/fetchUser")
// Loading All The Functions 
const addTodo = require("./subTodos/addTodo")
const fetchTodos = require("./subTodos/fetchTodos")
const deleteTodo = require("./subTodos/deleteTodo")
const updateTodo = require("./subTodos/updateTodo");
// Handling the GET request for the /fetchTodos End Point.

router.get("/fetchTodos", fetchUser, (req, res) => {
    try {
        fetchTodos(req, res);
    }
    catch {
        res.status(500).json({ success: false, error: "Internal Server Error." });

    }
})

// Handling the POST request for the /addTodo End Point.

router.post("/addTodo", [ev.body("title", "Title Can Not Be Empty").exists(), ev.body("description", "Description Can Not Be Empty").exists()], fetchUser,
    (req, res) => {
        let errors = ev.validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ success: false, errors: errors.array() })
        }
        try {
            addTodo(req, res);
        }
        catch {
            res.status(500).json({ success: false, error: "Internal Server Error." })
        }
    })

// Handling the PUT request for the /updateTodo End Point.

router.put("/updateTodo/:id", [ev.body("title", "Title Can Not Be Empty").exists(), ev.body("description", "Description Can Not Be Empty").exists()], fetchUser, (req, res) => {
    let errors = ev.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() })
    }
    try {
        updateTodo(req, res);
    }
    catch {
        res.status(500).json({ success: false, error: "Internal Server Error." })

    }
})

// Handling the DELETE request for the /deleteTodo End Point.

router.delete("/deleteTodo/:id", fetchUser, (req, res) => {
    try {
        deleteTodo(req, res);
    }
    catch {
        res.status(500).json({ success: false, error: "Internal Server Error." })

    }
})
module.exports = router