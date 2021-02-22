const db = require('./../db')
const Users = db.Users

module.exports = async function (req, res) {
    try {
        const checkForDuplicates = await Users.countDocuments(
            { username: { $eq: req.body.username }
            });
        if (checkForDuplicates > 0) {
            res.json({message: 'You are trying to insert duplicate record! ACCOUNT WAS NOT CREATED.'})
        } else {
        const NewUser = await Users.create(req.body);
       res.status(200).json({message: `A new account was created! User ID: ${NewUser._id}`});
         }                
    } catch (error) {
        res.status(500).json({message: error});
    }
}
