const express = require("express");
const { getAllUsers, createAUser, deleteAUser, updateAUser } = require("../controllers/user");
const router = express.Router();

router.route("/")
.get(getAllUsers) // get all user
.post(createAUser) //create a user
.patch(updateAUser) //upadte a user
.delete(deleteAUser); //delete a user

module.exports = router;
