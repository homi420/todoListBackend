const express = require("express");
const app = express();
const cors = require("cors")
const connectToMongo = require("./db")
connectToMongo()

app.use(express.json());
app.use("/api/auth", cors(), require("./routes/auth"));
app.use("/api/todos", cors(), require("./routes/todos"));
app.listen(5000, () => {
    console.log("Backend Running succesfully")
})