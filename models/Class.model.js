const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const classeSchema = new Schema(
    {
        student: { 
            type: String 
        },
        subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
        classesPerWeek: {
            type: Number
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Classe = model("classe", classeSchema);

module.exports = Classe;