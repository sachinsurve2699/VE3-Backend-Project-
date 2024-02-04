const express = require("express")
const cors = require("cors")

const routerUser = require("./router/user")
const routerTasks = require("./router/tasks")

const app = express()
app.use(express.json())
app.use(cors("*"))
app.use("/user", routerUser)
app.use("/tasks", routerTasks)

app.listen(6000, "127.0.0.1", () => {
  console.log("Server started at port  6000")
})
