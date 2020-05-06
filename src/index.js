const express = require('express')
require('./db/mongoose')        // to ensure connection
const userRouter = require('./routers/user')  // to take data form user.js
const taskRouter = require('./routers/task')   // to take data form task.js


// basic server structure
const app = express()
const port = process.env.PORT || 3000


// // to stop only GET request
// app.use((req,res,next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// //  under maintenace(no function work)
// app.use((req, res, next ) => {
//     res.status(503).send('Site is under maintenance, come back coon!')
// })
// to pass json object data to handler
app.use(express.json())

app.use(userRouter)   
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port' + port)
})


// to find task
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5eb29faf52d6652b28c947bd')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5eb292cc14b61030343576f9')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()