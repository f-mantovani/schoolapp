const { Schema, model } = require("mongoose");

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
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        profileImg: {
            type: String
        },
        subjects: [{type:mongoose.Schema.Types.ObjectId, ref:'subjects'}]
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Teacher = model("teacher", teacherSchema);

module.exports = Teacher;