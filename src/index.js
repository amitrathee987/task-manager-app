const express = require('express')
require('./db/mongoose')        // to ensure connection
const userRouter = require('./routers/user')  // to take data form user.js
const taskRouter = require('./routers/task')   // to take data form task.js

// basic server structure
const app = express()
const port = process.env.PORT || 3000

// to pass json object data to handler
app.use(express.json())

app.use(userRouter)   
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port' + port)
})

const bcrypt = require('bcrypt')

const myFunction = async() => {
    const password = 'Red1234565!'
    const hashedPassword = await bcrypt.hash(password,8)

    console.log(password)
    console.log(hashedPassword)
}

myFunction()