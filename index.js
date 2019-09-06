// implement your API here

const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))

    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'The users2 information could be retrevied'})
    })
})

server.post('/api/users', (req, res) => {
    console.log(req.body)
    const user = req.body
    db.insert(user)
    .then(({id}) => db.findById(id))
    .then(user => {
        res.status(201).json(user)
    })
   
})

server.get('/api/users/:id', (req, res) => {
    const { id }= req.params
    db.findById(id)
    .then(user => {
        console.log('user', user)
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({error: "The user with the specificed ID does not exist"})
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'The user information could be retrevied'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
    .then(deleted =>  {
        if (deleted) {
            res.status(204).end()
        } else {
            res.status(404).json({error: "user with ID doesnt exist"})
        }
    } )
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'server error deleting'})
    })
})

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const {name, bio} = req.body
    if (!name && !bio) {
        res.status(400).json({error: 'Requires some changes'})
    }
    db.update(id, {name, bio})
    .then(updated =>  {
        if (updated) {
            db.findById(id)
            .then(user => res.status(200).json(user))
            .catch( err => {
                console.log(err)
                res.status(500).json({error: 'error retrieving user'})
            })
        } else {
            res.status(404).json({error: 'user with id not found'})
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({error: 'error updating user'})
    })
})

server.listen(4444, () => console.log('server on 4444'))