const express = require('express');
const router = express.Router();
const data = require('../data')
const path = require('path');

// GET /api/users
router.get('/', (req, res) => {
    res.json({ users: data.users });
});


// GET /api/users/:id
//get user by id (path param)
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = data.users.find(item=>item.id===parseInt(id))
    if(user) res.json(user)
    else res.status(404).json({ message: `User with ID: ${id} not found` });
});

// POST /api/users
//add user (body data)
router.post('/', (req, res) => {
    const userData = req.body
    data.users.push(userData)
    res.json({ message: `User added`, users: data.users });
});

// PUT /api/users/:id
//update user by id (path param + body data)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userData = req.body
    //find index of user by id into array 
    const userInd = data.users.findIndex(item=>item.id===parseInt(id))

    if(userInd !== -1){
        //change user into array
        data.users[userInd]=userData
        res.json({ message: `User with ID: ${id} updated`, users: data.users });
    }else{
        res.status(404).json({ message: `User not found` })
    }
});

// DELTE /api/users
//delete user by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userInd = data.users.findIndex(item=>item.id===parseInt(id))

    if(userInd !== -1){
        //delete user into array
        data.users.splice(userInd, 1)
        res.json({ message: `User with ID: ${id} deleted`, users: data.users });
    }else{
        res.status(404).json({ message: `User not found` })
    }

});
module.exports = router;
