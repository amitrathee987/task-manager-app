const express = require('express')
require('./db/mongoose')        // to ensure connection
const User = require('./models/user')       // to grab user data structure
const Task = require('./models/task')       // to grab task data structure


// basic server structure
const app = express()
const port = process.env.PORT || 3000

// to pass json object data to handler
app.use(express.json())

// to get user data from client
app.post('/user', (req,res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})





// to get task data from client
app.post('/task', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port)
})