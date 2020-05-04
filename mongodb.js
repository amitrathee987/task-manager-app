// CRUD create read update delete


//instilize mongodb
const {MongoClient, ObjectID} = require('mongodb')

// // to see object 
// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp() )   // to see time 

//connection url
const connectionURL = 'mongodb://127.0.0.1:27017'

//database name
const databaseName = 'task-manger'

//connect method to connect to the server
MongoClient.connect(connectionURL,{ useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')   
    }
    // insert collection 
    const db =client.db(databaseName)
    
    // // insert one object in user collection
    // db.collection('user').insertOne({
    //     _id: id,       // object id which was already exists
    //     name:'Naman',
    //     age: 23
    // }, (error, result) => {          
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    //insert many objects in user collection
    // db.collection('user').insertMany([
    //     {
    //         name: 'Rohit',
    //         age: 22
    //     },  {
    //         name: 'kunal',
    //         age: 18
    //     }
    // ], (error, result)=> {
    //     if (error) {
    //         console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // insert 3 objects into a new task collection
    // db.collection('Task collection').insertMany([
    //     {
    //         task:'meditation',
    //         completed: true
    //     }, {
    //         task:'running',
    //         completed:false
    //     }, {
    //         task:'drawing',
    //         completed:true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // to search one data by name/id/age/... 
    // db.collection('user').findOne({_id: new ObjectID("5eaf56c852ff4b42b4de94cf")}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to fatch')
    //     }
    //     console.log(result)
    // })

    // to search many data                 toArray only for data it doesn't total count
    // db.collection('user').find({age: 23}).toArray((error, result) => {
    //     if (error) {
    //        return console.log('Unable to fatch')
    //     }
    //         console.log(result)
    //     })


    // to find only count number     (if want to see both count and data, than apply both commands)
    // db.collection('user').find({name:'amit'}).count((error,result) => {
    //     if (error) {
    //         return console.log('Unable to fatch')
    //     }
    //     console.log(result)
    // })        
    

    // to  fetch boolean task

    // db.collection('Task collection').find( { completed: false}).toArray((error, result) => {
    //     if (error) {
    //         return console.log('Unable to fatch')
    //     }
    //     console.log(result)
    // })

    // to update
    // const updateName = db.collection('user').updateOne({_id: new ObjectID ("5eaf54378296b0284886ca44")}, {
    //     $set: {
    //         name: 'Sumit'
    //     }
    // })
    // updateName.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // to increment
    // const updateAge = db.collection('user').updateOne({_id: new ObjectID ("5eaf54378296b0284886ca44")}, {
    //     $inc: {
    //         age: 1
    //     }
    // })
    // updateAge.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // to update many
    // const updateTask = db.collection('Task collection').updateMany( {
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // })
    // updateTask.then((result) => {
    //     console.log(result)
    // }).catch ((error) => {
    //     console.log(error)
    // })

    // to delete many
    // const deleteUser = db.collection('user').deleteMany({
    //     name: 'amit'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
              
})