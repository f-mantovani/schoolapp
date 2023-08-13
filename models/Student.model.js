const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        address: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
            lowercase: true,
            trim: true
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        type: {
            type: String,
        },
        profileImg: {
            type: String
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Student = model("student", studentSchema);

module.exports = Student;