import { Request , Response } from 'express';
import {  NetxFloor, NetxRoom, NetxProject, NetxBuilding } from '../../model/netxModel';
import User from '../../model/userModel';
import axios from 'axios';



// Controller to create a new project
async function createProject(req: Request, res: Response) {
  const { projectName , buildings } = req.body;
  const { email } = req.query; 
  
  try {
    const user : any = await User.find({
        email
    })
    if(!user) {
        return res.status(501).json({
            msg: "No User"
        })
    }
    // Create the project
    const createdProject : any = await NetxProject.create({
        projectName, 
        user: user[0]._id,
    })

    buildings.map(async (building: any)=> {
      const {data: {createdBuilding}} : any = await axios.post('http://localhost:5000/api/netx/building' , {        
        buildingName: building.buildingName,
        isCore: building.isCore, 
        isRouter: building.isRouter, 
        servers: building.servers,
        projectId: createdProject._id
      });
      
      building = {...building , _id: createdBuilding._id};
      
      building.floors.map(async(floor: any) => {
        const {data: {createdFloor}} : any = await axios.post('http://localhost:5000/api/netx/floor' , {
          floorName: floor.name, 
          isCore: !floor.isDistributed, 
          buildingId: building._id
        })
        floor = {...floor , _id: createdFloor._id}
        floor.rooms.map(async(room: any) => {

          for(let i = 0 ; i < room.count ; i++) {
            await axios.post('http://localhost:5000/api/netx/room' , {
              roomName: room.roomName, 
              networkPoints: room.networkPoints, 
              floorId: floor._id,
              count: room.count
            })
          }
        })
      })
    })
    
    return res.status(201).json({ createdProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}


// Controller to update a project
async function updateProject(req: Request, res: Response) {
  const { projectId } = req.params;
  const { projectName , buildings } = req.body;
  try {
    // Find the project by its ID
    const project: any = await NetxProject.findById(projectId);
    const updatedProject : any = await NetxProject.findByIdAndUpdate(projectId , {
      projectName: projectName || project.projectName, 
      buildings: buildings || project.buildings
    } , {new: true});
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }


    buildings?.map(async (building: any)=> {
      const {data: {updatedBuilding}} : any = await axios.put(`http://localhost:5000/api/netx/building/${building}` , {        
        buildingName: building.buildingName,
        isCore: building.isCore === 'core' ? true : false, 
        isRouter: building.isRouter, 
        servers: building.servers
      });
      
      updatedBuilding.floors.map(async(floor: any) => {
        const {data: {updatedFloor}} : any = await axios.put(`http://localhost:5000/api/netx/floor/${floor}` , {
          floorName: floor.name, 
          isCore: !floor.isDistributed, 
          buildingId: building._id
        })

        floor.rooms.map(async(room: any) => {
          
          for(let i = 0 ; i < room.count ; i++) {
            await axios.put(`http://localhost:5000/api/netx/room/${room}` , {
              roomName: room.name, 
              networkPoints: room.networkPoints, 
              floorId: floor._id
            })
          }
        })
      })
    })
    

    return res.status(200).json({ updatedProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to delete a project
async function deleteProject(req: Request, res: Response) {
  const { projectId } = req.params;
  try {
    // Find the project by its ID
    const project = await NetxProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const deletedProject = await NetxProject.findByIdAndDelete(projectId);

    return res.status(200).json({ message: 'Project deleted successfully.' , deletedProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

async function getUserProjects(req: Request , res: Response) {
    try {
        const {email} = req.query;
        const user : any = await User.find({
            email
        })
        if(!user) {
            return res.status(501).json({
                msg: "No User"
            })
        }

        const projects = await NetxProject.find({user: user[0]._id});
        console.log(user);
        
        res.status(200).json({
            projects
        })
        console.log("projects" , projects);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
        
    }
}

async function getProject(req: Request , res: Response) {
    try {
        const {projectId} = req.params;
        const project = await NetxProject.findById(projectId);
        res.status(200).json({
            project
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })
        
    }
}


export {
    createProject, 
    updateProject, 
    deleteProject, 
    getUserProjects, 
    getProject
}