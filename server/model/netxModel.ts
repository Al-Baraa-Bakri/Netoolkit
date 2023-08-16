import mongoose from "mongoose"; 


const roomSchema = new mongoose.Schema({
    floor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NetxFloor'
    }, 
    roomName: {
        type: String, 
        // required: true,
    },
    networkPoints: {
        type: Number, 
        // required: true,
        min: 0
    }, 
    count: {
        type: Number
    }
})

const floorSchema = new mongoose.Schema({
    building: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'NetxBuilding',
    }, 
    floorName: {
        type: String ,
        // required : true,
    }, 
    isCore: {
        type: Boolean, 
        // required : true,
    }, 
    rooms: {
        type: [mongoose.Schema.Types.ObjectId],
        // required: true,
        ref: 'NetxRoom',
    }
})



const buildingSchema = new mongoose.Schema({
    project: {
        type : mongoose.Schema.Types.ObjectId,
        // required : true, 
        ref : "NetxProject"
    }, 
    buildingName: {
        type: String, 
        required : true, 
    }, 
    floors: {
        type: [mongoose.Schema.Types.ObjectId],
        // required: true,
        ref: 'NetxFloor',
    }, 
    isCore: {
        type: Boolean
    },
    isRouter: {
        type: Boolean
    }, 
    servers: {
        type: [String]
    }
})




const projectSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        // required : true, 
        ref : "User"
    }, 
    projectName: {
        type: String, 
        required : true, 
    }, 
    buildings: {
        type: [mongoose.Schema.Types.ObjectId],
        // required: true,
        ref: 'NetxBuilding',
        default: []
    }
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