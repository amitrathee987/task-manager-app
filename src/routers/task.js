const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


// to post task data from client
router.post('/task', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()           // if condition full fill
        res.send(task)
    } catch (e) {
        res.status(404).send(e)     // 400- bad request
    }
})



// to get(fatch) all tasks

router.get('/task', async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


// to get(fatch ) one task by id
router.get('/task/:id',async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})


// patch is used to update
router.patch('/task/:id', async(req,res) => {
    const updates =  Object.keys(req.body)                  // req body keys which we want update
    const allowedUpdates = ['task', 'completed']      // specify which we can update
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)                      // if update match then code run further
    })
        if (!isValidOperation) {
            return res.status(404).send({error: ' Invalid updates!'})       // if update doesn't match
        }

    try {                                                               // first find then update if all the validation conditions true
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {                           // if conditions fail
        res.status(400).send(e)
    }
})


// delete task by id
router.delete('/task/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router