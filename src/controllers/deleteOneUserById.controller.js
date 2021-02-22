const db = require('./../db')
const Users = db.Users;

module.exports = async function (req, res) {
    try {
        const deleteOneUserById = await Users.findByIdAndDelete(req.params.ObjectId);
        res.status(200).json({ message: 'This user was successfully deleted:', deleteOneUserById });
           
    } catch (error) {
        res.status(404).json({ message: `User ID: ${req.params.ObjectId} was not found! Nothing will be deleted.` });
        res.status(500).json({ message: error.message});
    }
}