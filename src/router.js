const express = require('express')
const router = express.Router()

const { 
    
    addUser, 
    getAllUsers, 
    updateUser
  
} = require('./controllers');


router.post('/users', addUser);
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);


module.exports = router;