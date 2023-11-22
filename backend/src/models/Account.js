import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true,
        },
        accountNumber: {
            type: Number,
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const Account = mongoose.model("accounts", accountSchema);

export default Account;