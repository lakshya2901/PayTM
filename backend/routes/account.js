const express = require("express");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const { Account } = require("../db");
const app = express();

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account.balance
    })
});

router.post('/transfer',authMiddleware, async(req, res)=>{
    console.log("User ID:", req.userId);
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    console.log("req.userId:", req.userId);

    const account = await Account.findOne({
        userId: req.userId,
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({
            userId: req.userId
        },
        {
            $inc: {
                balance: -amount
            }
        }
    ).session(session);

    await Account.updateOne({userId: to}, {$inc:{balance: amount}}).session(session);

    //commiting transacaction
    session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

})
module.exports = router