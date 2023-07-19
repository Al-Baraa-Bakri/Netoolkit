import mongoose from "mongoose"; 

const projectSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : "User"
    }, 
    name: {
        type: String, 
        required : true, 
    }
})


const NetxProject = mongoose.model('NetxProject' , projectSchema); 

export {
    NetxProject
}