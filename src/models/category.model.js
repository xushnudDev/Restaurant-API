import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
        unique: true,
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
    }],
},{
    collection: "categories",
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("Category", CategorySchema);