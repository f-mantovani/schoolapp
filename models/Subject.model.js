const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const subjectSchema = new Schema(
    {
        name: {
            type: String,
            name: required,
        },
        pricePerHour: {
            type: Number
        },
        books: [{type:mongoose.Schema.Types.ObjectId, ref:'subject'}]
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Subject = model("subject", subjectSchema);

module.exports = Subject;