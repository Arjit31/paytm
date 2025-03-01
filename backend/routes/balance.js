const {Router} = require("express");
const { authMiddleware } = require("../middleware");
const {Account} = require("../db");
const mongoose = require("mongoose");

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await Account.findOne({userId});
    try {
        if (!account) {
            throw new Error("Account not found");
        }
        res.json({balance: account.balance});
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const {to, amount} = req.body;
    const session = await mongoose.startSession();
    try {
    session.startTransaction();

        const fromAccount = await Account.findOne({userId}).session(session);
        const toAccount = await Account.findOne({userId: to}).session(session);
        if (!fromAccount || !toAccount) {
            throw new Error("Account not found");
        }
        if (fromAccount.balance < amount) {
            throw new Error("Insufficient balance");
        }
        await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        await session.commitTransaction();
        res.json({message: "Transfer successful"});
    } catch (error) {
        await session.abortTransaction();
        return res.status(400).json({error: error.message});
    }
});

module.exports = router;