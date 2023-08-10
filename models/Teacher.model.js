const { Schema, model } = require("mongoose");
const mongoose = require("mongoose") //there was not create this variable 

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const teacherSchema = new Schema(
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
            required: true
        },
        profileImg: {
            type: String
        },
        subjects: [{type:mongoose.Schema.Types.ObjectId, ref:'subject'}] //variable we created is used here
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Teacher = model("teacher", teacherSchema);

module.exports = Teacher;