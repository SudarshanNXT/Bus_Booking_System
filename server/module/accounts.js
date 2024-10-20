import mongoose from "mongoose";

const Accounts = new mongoose.Schema({
    name : {type:String,
        required:true,
    },

    email : {type:String,
        required:true,
    },

    password:{
        type:String,
            required:true,

    }
})

const AccountModel = mongoose.model("accounts",Accounts);
export default AccountModel;