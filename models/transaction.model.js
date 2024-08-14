import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        required: true
    },
    category: {
        type: String,
        enum: ['saving', 'expense', 'investment']
    },
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: Number,
        default: ""
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const transaction = mongoose.model('Transaction', transactionSchema);

export default transaction;