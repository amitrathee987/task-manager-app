const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// to post user data from client
router.post('/user', async(req,res) => {
    const user = new User(req.body)

    try{
        await user.save()               // if condition full fill
        res.status(201).send(user)
    } catch (e) {                       // if condtion fail
        res.status(400).send(e)
    }
})

// to get (find) all users data
router.get('/user', async(req, res) => {
    try {                                       //if condition full fill 
        const users = await User.find({})       // to find in user data
        res.send(users)
    } catch (e) {                               // if condition fail
        res.status(500).send(e)
    }
})


// to get (find) selective users data
router.get('/user/:id', async(req, res) => {
     const _id = req.params.id

     try {
         const user = await User.findById(_id)  // if condition full fill

         if (!user) {                            // id user id doesn't match with data , then it run
             return res.status(404).send()
         }

            res.status(201).send(user)              // if user id is match then it run

     } catch (e) {                              //   if condition fail
            res.status(500).send(e)
     }     
})


// patch is used to update
router.patch('/user/:id', async(req,res) => {
    const updates =  Object.keys(req.body)                  // req body keys which we want update
    const allowedUpdates = ['name', 'email', 'password', 'age']      // specify which we can update
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)                      // if update match then code run further
    })
        if (!isValidOperation) {
            return res.status(404).send({error: ' Invalid updates!'})       // if update doesn't match
        }

    try {                                                               // first find then update if all the validation conditions true
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {                           // if conditions fail
        res.status(400).send(e)
    }
})


// delete user by id
router.delete('/user/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)    // find one id and delete

        if (!user) {                                    //if user id doesn't match
            return res.status(404).send()
        }

        res.send(user)                          // if id match
    }catch (e) {
        res.status(500).send(e)             // if condition fail
    }
})

module.exports = router