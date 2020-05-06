const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


// to post task data from client
router.post('/task',auth,  async(req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        
        await task.save()           // if condition full fill
        res.send(task)
    } catch (e) {
        res.status(404).send(e)     // 400- bad request
    }
})



// to get(fatch) all tasks

router.get('/tasks', auth, async(req, res) => {
    try {
        const tasks = await Task.find({owner: req.user._id})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


// to get(fatch ) one task by id
router.get('/task/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})


// patch is used to update
router.patch('/task/:id', auth, async(req,res) => {
    const updates =  Object.keys(req.body)                  // req body keys which we want update
    const allowedUpdates = ['task', 'completed']      // specify which we can update
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)                      // if update match then code run further
    })
        if (!isValidOperation) {
            return res.status(404).send({error: ' Invalid updates!'})       // if update doesn't match
        }

    try {  
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
        task[update] = req.body[update]
        })
        await task.save()                                                                

        res.send(task)
    } catch (e) {                           // if conditions fail
        res.status(400).send(e)
    }
})


// delete task by id
router.delete('/task/:id',auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router