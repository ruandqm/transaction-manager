import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        account: {
            type: mongoose.Schema.ObjectId,
            ref: "accounts",
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

const Transaction = mongoose.model("transactions", transactionSchema);

export default Transaction;