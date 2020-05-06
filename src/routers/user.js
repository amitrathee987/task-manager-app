const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// to post user data from client
router.post('/user', async(req,res) => {
    const user = new User(req.body)

    try{
        await user.save()               // if condition full fill
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {                       // if condtion fail
        res.status(400).send(e)
    }
})
//login with email and password
router.post('/user/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)        // to verify by email and password than give result
        const token = await user.generateAuthToken()                                // to provide token to only verified user
        
        res.send({ user, token})
    } catch (e) {
        res.status(400).send()
    }
})


// log out 
router.post('/user/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.token.filter((token) => {        // only in  which we logout, not in other operator
            return token.token !== req.token    
        })
        await req.user.save( )
        
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
    

// log out from all operators
router.post('/user/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = [ ]        // logout from all operators
        await req.user.save()
        
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

// to see only his profile
router.get('/user/me',auth, async(req, res) => {        
    res.send(req.user)                                              
})



// patch is used to update
router.patch('/user/me', auth, async(req,res) => {
    const updates =  Object.keys(req.body)                  // req body keys which we want update
    const allowedUpdates = ['name', 'email', 'password', 'age']      // specify which we can update
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)                      // if update match then code run further
    })
        if (!isValidOperation) {
            return res.status(404).send({error: ' Invalid updates!'})       // if update doesn't match
        }

    try {                                                               
            updates.forEach((update) => {
            req.user[update] = req.body[update]
            
        })
        await req.user.save()
       
        res.send(req.user)
    } catch (e) {                           // if conditions fail
        res.status(400).send(e)
    }
})


// delete user by id
router.delete('/user/me',auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)                          // if id match
    }catch (e) {
        res.status(500).send(e)             // if condition fail
    }
})

module.exports = router