const User = require('../models/user-model');
const encrypt = require('../utils/crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPassword = process.env.JWT_PASSWORD;
// Creating user
createUser = async (req, res) => {
    let body = req.body;
    console.log("Password", jwtPassword)
    const token = jwt.sign({ isValid: true }, jwtPassword, { expiresIn: "365d" });
    console.log("JWT", token);
    body.password = encrypt.sha256(body.password);
    body.authToken = token;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all details',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    //check if user is already present
    let userData = await User.find({ email: body.email }).catch(err => {
        return res.status(404).json({
            success: false,
            err,
            message: "Error has occured!"
        });
    });

    if (userData.length === 0) {
        user.save().then(() => {
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'User added successfully!',
            });
        }).catch(error => {
            return res.status(400).json({
                error,
                message: 'User not added!',
            });
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'User already registered!',
        });
    }
}

updateUser = async (req, res) => {
    let body = req.body;
    body.password = encrypt.sha256(body.password);

    let userData = await User.findOne({ _id: req.params.id }).catch(err => {
        return res.status(404).json({
            success: false,
            err,
            message: "Error has occured!"
        });
    });
    if (userData.length === 0) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }
    userData.name = body.name;
    userData.password = encrypt.sha256(body.password);
    const user = new User(userData);
    let userUpdated = await user.save().catch(err => {
        return res.status(404).json({
            success: false,
            err,
            message: "Error has occured!"
        });
    });
    return res.status(200).json({
        success: true,
        id: user._id,
        message: 'User updated successfully!',
    });
}

module.exports = { createUser, updateUser }