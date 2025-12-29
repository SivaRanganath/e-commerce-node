const mongoose = require("mongoose");
const customValidator = require("validator");
const { userStatusEnum } = require("../shared/enums/userStatus");

const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        maxLength: 150,
        trim: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: function (email) {
            return customValidator.isEmail(email);
        }
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    status: {
        type: mongoose.Schema.Types.Number,
        values: Object.values(userStatusEnum),
        message: "{VALUE} is not a valid user status"
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: function (phoneNumber) {
            return customValidator.isMobilePhone(phoneNumber);
        }
    },
    isAdmin: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
}, { timestamps: true });


const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };