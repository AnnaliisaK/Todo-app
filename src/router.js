const express = require('express');
const router = express.Router();
// const verifyToken = require('../middleware/verifyToken');

const { 
    
    addUser, 
    getAllUsers, 
    updateUser,
    deleteOneUserById
  
} = require('./controllers');


router.post('/users', addUser);
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteOneUserById);


module.exports = router;