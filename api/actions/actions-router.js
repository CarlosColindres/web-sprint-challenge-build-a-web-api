const express = require('express')

const actionsModel = require('./actions-model')

const router = express.Router()

router.get('/', async (_, res) => {

    try {
        const actions = await actionsModel.get()
        res.status(200).json(actions)
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.get('/:id', async (req, res) => {

    const {id} = req.params

    try {
        const actions = await actionsModel.get(id)

        if(!actions) {
            res.status(404).json(err.message)
        }

        res.status(200).json(actions)
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.post('/', async (req, res) => {

    const {notes, description, project_id} = req.body

    try {
        if(!notes || !description || !project_id) {
            res.status(400).json({message: 'fields are required'})
        } else {
            const actions = await actionsModel.insert(req.body)
            res.status(200).json(actions)
        }
       
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {notes, description, project_id} = req.body

    try {
        if(!notes || !description || !project_id) {
            res.status(400).json({message: 'fields are required'})
        } else {
            const actions = await actionsModel.update(id, req.body)
            res.status(200).json(actions)
        }
       
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.delete('/:id', async (req, res) => {

    const {id} = req.params

    try {
        const actions = await actionsModel.remove(id)
        res.status(200).json(actions)
    } catch(err) {
        res.status(404).json(err.message)
    }
})


module.exports = router