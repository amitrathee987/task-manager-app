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

const jwt = require('jsonwebtoken')

const myFunction = async() => {
    // to create sign in authentication
    const token = jwt.sign({_id : 'abs' }, 'thisisnew', {expiresIn:'7 days'})  
    console.log(token)

    // to verify user correctively authenticate
    const data =jwt.verify(token, 'thisisnew')
    console.log(data)
}

myFunction()