import mongoose from "mongoose"; 


const roomSchema = new mongoose.Schema({
    floor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NetxFloor'
    }, 
    name: {
        type: String
    },
    networkPoints: {
        type: Number
    }
})

const floorSchema = new mongoose.Schema({
    building: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'NetxBuilding',
    }, 
    rooms: [roomSchema],
    name: {
        type: String ,
        required : true,
    }
})



const buildingSchema = new mongoose.Schema({
    project: {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : "NetxProject"
    }, 
    name: {
        type: String, 
        required : true, 
    }, 
    floors: [floorSchema], 

})




const projectSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
        ref : "User"
    }, 
    name: {
        type: String, 
        required : true, 
    }, 
    buildings: [buildingSchema]
})






const NetxProject = mongoose.model('NetxProject' , projectSchema); 
const NetxBuilding = mongoose.model('NetxBuilding' , buildingSchema);
const NetxFloor = mongoose.model('NetxFloor' , floorSchema);
const NetxRoom = mongoose.model('NetxRoom', roomSchema)

export {
    NetxProject,
    NetxBuilding, 
    NetxFloor,
    NetxRoom
}