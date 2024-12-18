const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://lakshyababel456:Babel997@cluster0.mheb0.mongodb.net/";
const Schema = mongoose.Schema;

//connecting with mongoDB URL
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Connected to database")
})
.catch((error)=>{
    console.error("Error in connecting to database", error)
})

//making Schema
const user_table = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password:{
        type: String,
        requied: true,
        minLength:6,
    },
    firstName:{
        type:String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName:{
        type: String,
        reuired:true,
        trim:true,
        maxLength:50
    }
});

//exporting Schema as USER

const User = mongoose.model("User", user_table);

//creatin g bank scehema

const BankSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        Ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
    }
})

const Account = mongoose.model("Account", BankSchema);

module.exports = {
    User, 
    Account
};