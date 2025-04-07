import mongoose from "mongoose";
const MealSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 1,
        maxlength: 150,
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 1,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        
    },
    
},{
    collection: "meals",
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("Meal", MealSchema);