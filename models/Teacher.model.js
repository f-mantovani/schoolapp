const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const teacherSchema = new Schema(
    {
        name: {
            type: String,
            name: required,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        img: {
            type: String
        },
        subject: [{type:mongoose.Schema.Types.ObjectId, ref:'subjects'}]
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Teacher = model("teacher", userSchema);

module.exports = Teacher;