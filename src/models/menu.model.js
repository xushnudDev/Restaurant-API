import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meal",
        required: true,
    }],
    status: {
        type: mongoose.Schema.Types.String,
        required: true,
        enum: ["active", "inactive"],
        default: "active",
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    }]
},{
    collection: "menus",
    timestamps: true,
    versionKey: false,
});

export default mongoose.model("Menu", MenuSchema);