const express = require('express');
const app = express();  
const cors = require("cors");




const userRouter = require("./user.js");
const accountRouter = require("./account.js")

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;