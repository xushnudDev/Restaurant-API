import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 150,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        minlength: 8,
    },
    phoneNumber: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        minLength: 9,
        maxLength: 9,
        match: /^(9[012345789]|6[125679]|7[0123456789]|3[3]|8[8]|2[0]|5[05])[0-9]{7}$/,
    },
    role: {
        type: mongoose.SchemaTypes.String,
        enum: ["user", "admin","owner"],
        default: "user",
    },
    tokens: {
        accessToken: {
            type: mongoose.SchemaTypes.String,
        },
        refreshToken: {
            type: mongoose.SchemaTypes.String,
        },
    }
},{
    collection: "users",
    timestamps: true,
    versionKey: false,
    
});

export default mongoose.model("User", userSchema);