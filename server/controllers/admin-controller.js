const User = require("../models/user-model.js");
const Contact = require("../models/contact-model");

//get all Users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
//delete user Id
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error); 
    }
};
//single user logic
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        if (!data) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
//get all the contacts
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updateData = await User.updateOne(
            { _id: id },
            { $set: updatedUserData }
        );
        if (!updateData.nModified) {
            return res.status(404).json({ message: "User Not Found or No Changes Made" });
        }
        return res.status(200).json({ message: "User Updated Successfully", updateData });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getAllContacts,
    deleteUserById,
    getUserById,
    updateUserById,
};
