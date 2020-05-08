const express = require('express')
require('./db/mongoose')        // to ensure connection
const userRouter = require('./routers/user')  // to take data form user.js
const taskRouter = require('./routers/task')   // to take data form task.js


// basic server structure
const app = express()
const port = process.env.PORT


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


