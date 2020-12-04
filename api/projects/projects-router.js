const express = require('express')

const projectModel = require('./projects-model')

const router = express.Router()

router.get('/', async (_, res) => {

    try {
        const projects = await projectModel.get()
        res.status(200).json(projects)
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.get('/:id', async (req, res) => {

    const {id} = req.params

    try {
        const projects = await projectModel.get(id)
        if(!projects) {
            res.status(404).json(err.message)
        }
            res.status(200).json(projects)
        
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.post('/', async (req, res) => {

    const {name, description} = req.body

    try {
        if(!name || !description) {
            res.status(400).json({message: 'fields are required'})
        } else {
            const projects = await projectModel.insert(req.body)
            res.status(200).json(projects)
        }
       
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, description} = req.body

    try {
        if(!name || !description) {
            res.status(400).json({message: 'fields are required'})
        } else {
            const projects = await projectModel.update(id,req.body)
            res.status(200).json(projects)
        }
       
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.delete('/:id', async (req, res) => {

    const {id} = req.params

    try {
        const projects = await projectModel.remove(id)
        if(!projects) {
            res.status(404).json(err.message)
        }
        res.status(200).json(projects)
    } catch(err) {
        res.status(404).json(err.message)
    }
})

router.get('/:id/actions', async (req, res) => {

    const {id} = req.params

    try {
        const projects = await projectModel.getProjectActions(id)
        res.status(200).json(projects)
    } catch(err) {
        res.status(404).json(err.message)
    }
})

module.exports = router