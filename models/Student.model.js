const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
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
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
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