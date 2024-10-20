import mongoose from "mongoose";

const Admin = new mongoose.Schema({
    email:String,
    password:String,

})

const AdminModel = mongoose.model("admin",Admin);
export default AdminModel;