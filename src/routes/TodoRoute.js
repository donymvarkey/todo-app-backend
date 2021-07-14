const express = require('express');
const middlewares = require('../middlewares');
const TodoModel = require('../models/TodoModel');

const router = express.Router();


router.post('/todo/create', middlewares.isAuthorised, async (req, res) => {
    try {
        const {name} = req.body;
        const userId = req.user.id;

        const Todo = new TodoModel({
            name: name,
            userId: userId,
            createdAt: Date.now().toString()
        })
        var data = await Todo.save();
        data ? 
                res.status(200).json({
                    status: true,
                    msg: 'Todo item saved'
                })
            :   res.status(400).json({
                    status: false,
                    msg: 'Failed to save todo item'
                })
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})

router.get('/todo/list/all', middlewares.isAuthorised, async (req, res) => {
    try {
        var data = await TodoModel.find({userId: req.user.id});
        data ? 
                res.status(200).json({
                    status: true,
                    data: data,
                    msg: 'Todo item saved'
                })
            :   res.status(400).json({
                    status: false,
                    msg: 'Failed to save todo item'
                })
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})

router.get('/todo/incomplete', middlewares.isAuthorised, async (req, res) => {
    try {
        var data = await TodoModel.find({userId: req.user.id, isCompleted: false});
        data ? 
                res.status(200).json({
                    status: true,
                    data: data,
                    msg: 'Todo item saved'
                })
            :   res.status(400).json({
                    status: false,
                    msg: 'Failed to save todo item'
                })
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})

router.get('/todo/complete', middlewares.isAuthorised, async (req, res) => {
    try {
        var data = await TodoModel.find({userId: req.user.id, isCompleted: true});
        data ? 
                res.status(200).json({
                    status: true,
                    data: data,
                    msg: 'Todo item saved'
                })
            :   res.status(400).json({
                    status: false,
                    msg: 'Failed to save todo item'
                })
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})

router.put('/todo/mark/fnished/:id', middlewares.isAuthorised, async (req, res) => {
    try {
        const {id} = req.params;
        var update = {
            isCompleted: true
        }
        var data = await TodoModel.findByIdAndUpdate(id, update);

        data ? 
            res.status(200).json({
                status: true,
                msg: 'Todo item updated'
            })
        :   res.status(400).json({
                status: false,
                msg: 'Failed to update todo item'
            })        
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})

router.delete('/todo/delete/:id', middlewares.isAuthorised, async (req, res) => {
    try {
        const {id} = req.params;
        var data = await TodoModel.findByIdAndDelete(id)

        data ? 
            res.status(200).json({
                status: true,
                msg: 'Todo item deleted'
            })
        :   res.status(400).json({
                status: false,
                msg: 'Failed to delete todo item'
            }) 
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error: Something went wrong.'
        })
    }
})

module.exports = router;