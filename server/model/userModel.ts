import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    id: String,
    tenant: String,
    username: String,
    email: String,
    emailVerified: Boolean,
    phoneNumber: String,
    phoneNumberVerified: Boolean,
    user_metadata: Object,
    app_metadata: Object
});

const User = mongoose.model("User" , userSchema); 

export default User;