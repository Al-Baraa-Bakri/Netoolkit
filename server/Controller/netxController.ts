import { Request , Response } from 'express';
import AsyncHandler from 'express-async-handler'; 
import { NetxBuilding, NetxFloor, NetxProject, NetxRoom } from '../model/netxModel';
import axios from 'axios'; 
import User from '../model/userModel';


const getAllProjects = AsyncHandler(async (req: Request , res: Response) => {
    const { email } = req.query; 
    const userId = await User.find({email});
    const projects = await NetxProject.find({user: userId[0]._id});

    if(projects) {
        res.status(200).json({
            msg: "User Projects", 
            projects: projects
        })
    } 
    else {
        res.status(400).json({
            msg: "error"
        })
    }
})

const getProject = AsyncHandler(async (req: Request , res:Response) => {
    const { projectId } = req.params; 
    const project = await NetxProject.findById(projectId);
    
    if(project) {
        res.status(200).json({
            msg: "Project", 
            project
        })
    }
    else {
        res.status(400).json({
            msg: 'error'
        })
    }
    
})

const createProject = AsyncHandler(async (req: Request , res: Response) => {
    const { email } = req.query;
    const { name , buildings } = req.body;
    // Get user Id 
    const userId = await User.find({email}); 
    
    const createdProject = await NetxProject.create({
        user: userId[0]._id, 
        name: name,
        buildings
    })
    
    if(createdProject) {
        res.status(201).json({
            msg: "Project created successfully", 
            project: createdProject
        })
    } else {
        res.status(400).json({
            msg: "Error", 
        })
    }
})

const updateProject = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const { name } = req.body;
  const {projectId} = req.params;

  // Get user Id
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Update or create project
  const filter = { _id: projectId };
  const update = { $set: { name } };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const project = await NetxProject.findOneAndUpdate(filter, update, options);

  res.status(200).json({
    msg: "Project updated successfully",
    project,
  });
});


const deleteProject = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const {projectId} = req.params;
  // Get user Id
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Delete project
  const filter = { _id: projectId };
  const project = await NetxProject.findOneAndDelete(filter);
  if (!project) {
    res.status(404).json({ msg: "Project not found" });
    return;
  }

  res.status(200).json({
    msg: "Project deleted successfully",
    project,
  });
});


// BUILDINGS
const createBuilding = AsyncHandler(async (req: Request, res: Response) : Promise<any> => {
    const { email } = req.query;
    const { name , projectId } = req.body;
    const userId = await User.find({email}) as any[]; 
    const project = await NetxProject.findById(projectId) as any;     
    if(userId[0]._id.toString() !== project.user.toString()) {
        return res.status(400).json({
            msg: "The user must be the creator of the project"
        })
    }
    const createdBuilding = await NetxBuilding.create({
        project: projectId, 
        name,
    })

    if(createdBuilding) {
        project.buildings.push(createdBuilding);
        await project.save();
        res.status(201).json({
            msg: "Building created", 
            building: createdBuilding
        })
    }

    else {
        res.status(400).json({
            msg: "error"
        })
    }
})

const getBuilding = AsyncHandler(async (req: Request, res:Response) => {
    const { buildingId } = req.params; 
    const building = await NetxBuilding.findById(buildingId);

    if(building) {
        res.status(200).json({
            msg: "Building", 
            building
        })
    }
    else {
        res.status(400).json({
            msg: 'error'
        })
    }
})

const updateBuilding = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const { name } = req.body;
  const { buildingId } = req.params;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Find the building
  const building = await NetxBuilding.findOneAndUpdate(
    { _id: buildingId },
    { name },
    { new: true }
  );
  if (!building) {
    res.status(404).json({ msg: "Building not found" });
    return;
  }

  // Find the project that contains the building
  const project = await NetxProject.findOne({ "buildings._id": buildingId });
  if (!project) {
    res.status(404).json({ msg: "Project not found" });
    return;
  }

  // Update the building in the project
  const index = project.buildings.findIndex(
    (b: any) => b._id.toString() === buildingId
  );
  if (index < 0) {
    res.status(404).json({ msg: "Building not found in project" });
    return;
  }
  project.buildings[index].name = name;

  // Save the updated project
  await project.save();

  res.status(200).json({
    msg: "Building updated successfully",
    building,
  });
});


const deleteBuilding = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const { buildingId } = req.params;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Find the building
  const building = await NetxBuilding.findOne({ _id: buildingId });
  if (!building) {
    res.status(404).json({ msg: "Building not found" });
    return;
  }

  // Find the project that contains the building
  const project = await NetxProject.findOne({ "buildings._id": buildingId }) as any;
  if (!project) {
    res.status(404).json({ msg: "Project not found" });
    return;
  }

  // Remove the building from the project
  project.buildings = project.buildings.filter(
    (b: any) => b._id.toString() !== buildingId
  );

  // Save the updated project
  await project.save();

  // Delete the building
  await NetxProject.deleteOne({ _id: buildingId });

  res.status(200).json({
    msg: "Building deleted successfully",
    building,
  });
});






// Floors


const getFloor = AsyncHandler(async (req: Request, res:Response) => {
    const { floorId } = req.params; 
    const floor = await NetxFloor.findById(floorId);
    
    if(floor) {
        res.status(200).json({
            msg: "Floor", 
            floor
        })
    }
    else {
        res.status(400).json({
            msg: 'error'
        })
    }
})


const createFloor = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const { name, buildingId } = req.body;
  const project = await NetxProject.findOne({ "buildings._id": buildingId }) as any;
  console.log("PROJECT" , project);
  
  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Find the building
  const building = await NetxBuilding.findOne({ _id: buildingId });
  if (!building) {
    res.status(404).json({ msg: "Building not found" });
    return;
  }

  // Create the floor
  const floor = await NetxFloor.create({
    name,
    building: building._id
  });

  // Add the floor to the building
  building.floors.push(floor);

  // Save the updated building
    await building.save();
        const index = project.buildings.findIndex(
        (b: any) => b._id.toString() === buildingId
    );
    if (index < 0) {
        res.status(404).json({ msg: "Building not found in project" });
        return;
    }

    project.buildings[index].floors.push(floor);

    await project.save();
  res.status(201).json({
    msg: "Floor created successfully",
    floor,
  });
});


const updateFloor = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const { floorId } = req.params;
  const { name } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Find the floor
  const floor = await NetxFloor.findOne({ _id: floorId });
  if (!floor) {
    res.status(404).json({ msg: "Floor not found" });
    return;
  }

  // Update the floor
  floor.name = name;

  // Save the updated floor
  await floor.save();

  // Find the building that contains the floor
   const building = await NetxBuilding.findOne({ "floors._id": floorId }) as any;
  console.log("floorId" , floorId );
  
  if (!building) {
    res.status(404).json({ msg: "Building not found" });
    return;
  }
  
  // Update the floor in the building
  const floorIndex = building.floors.findIndex((floor: any) => floor._id.toString() === floorId);
  if (floorIndex === -1) {
    res.status(404).json({ msg: "Floor not found in building" });
    return;
  }
  building.floors[floorIndex] = floor;

  // Save the updated building
  await building.save();
  
  const project = await NetxProject.findOne({ "buildings._id": building.id }) as any;


   project.buildings[floorIndex].floors.push(floor);

    await project.save();

  res.status(200).json({
    msg: "Floor updated successfully",
    floor,
  });
});


const deleteFloor = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.query;
  const { floorId } = req.params;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
    return;
  }

  // Find the floor
  const floor = await NetxFloor.findOne({ _id: floorId });
  if (!floor) {
    res.status(404).json({ msg: "Floor not found" });
    return;
  }

  // Find the building
  const building = await NetxBuilding.findOne({ "floors._id": floorId }) as any;
  if (!building) {
    res.status(404).json({ msg: "Building not found" });
    return;
  }

  // Remove the floor from the building
  building.floors = building.floors.filter((floor: any) => floor._id.toString() !== floorId);

  // Delete the floor
  await floor.deleteOne();

  // Save the updated building
  await building.save();

  const project = await NetxProject.findOne({ "buildings._id": building.id }) as any;

  if (!project) {
    res.status(404).json({ msg: "Project not found" });
    return;
  }

    project.buildings.forEach((b: any) => {
        if (b._id.toString() === building._id.toString()) {
        b.floors = b.floors.filter((floor: any) => floor._id.toString() !== floorId);
    }
  });

  await project.save()

  res.status(200).json({
    msg: "Floor deleted successfully",
  });
});


// Rooms 

const createRoom = AsyncHandler(async (req: Request , res: Response) => {
    const { email } = req.query;
    const {  name , floorId , networkPoints } = req.body;
      // Find the user
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({ msg: "User not found" });
        return;
    }

    // Find the floor
    const floor = await NetxFloor.findOne({ _id: floorId });
    if (!floor) {
        res.status(404).json({ msg: "Floor not found" });
        return;
    }

    // Find the building
    const building = await NetxBuilding.findOne({ "floors._id": floorId }) as any;
    if (!building) {
        res.status(404).json({ msg: "Building not found" });
        return;
    }


    // Find the project
  const project = await NetxProject.findOne({ "buildings._id": building._id }) as any;
  if (!project) {
    res.status(404).json({ msg: "Project not found" });
    return;
  }

    // Create the room
  const room = await NetxRoom.create({
    name,
    networkPoints,
    floor: floor._id,
  });

  // Add the room to the floor
  floor.rooms.push(room);
  await floor.save();

    // Update the floor in the building
  const floorIndex = building.floors.findIndex((f: any) => f._id.toString() === floor._id.toString());
  if (floorIndex !== -1) {
    building.floors[floorIndex].rooms = floor.rooms;
  }

    // Update the building in the project
  const buildingIndex = project.buildings.findIndex((b: any) => b._id.toString() === building._id.toString());
  if (buildingIndex !== -1) {
    project.buildings[buildingIndex].floors = building.floors;
  }
  await project.save();

  // Save the room
  await room.save();

  await building.save();

  res.status(201).json({
    msg: "Room created successfully",
    room,
  });
})

const updateRoom = AsyncHandler(async(req: Request, res:Response) => {
      const { email } = req.query;
      const { name, networkPoints , floorId } = req.body;
      const { roomId } = req.params;

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ msg: "User not found" });
            return;
        }

          // Find the room
        const room = await NetxRoom.findOne({ _id: roomId }) as any;
        if (!room) {
            res.status(404).json({ msg: "Room not found" });
            return;
        }

          // Find the floor that the room belongs to
        const oldFloor = await NetxFloor.findOne({ _id: room.floor }).populate('building');
        if (!oldFloor) {
            res.status(404).json({ msg: "Floor not found" });
            return;
        }

          // Find the building that the floor belongs to
       const building = oldFloor.building as any;
        if (!building) {
            res.status(404).json({ msg: "Building not found" });
            return;
        }

          // Find the project that the building belongs to
        const project = await NetxProject.findOne({ "buildings._id": building._id }) as any;
        if (!project) {
            res.status(404).json({ msg: "Project not found" });
            return;
        }

            let newFloor : any;
            let newBuilding: any;
            let newProject;
            if (floorId) {
                newFloor = await NetxFloor.findOne({ _id: floorId });
                if (!newFloor) {
                res.status(404).json({ msg: "Floor not found" });
                return;
                }
            }

                // Find the building that the floor belongs to
            newBuilding = await NetxBuilding.findOne({ _id: newFloor.building })
            if (!newBuilding) {
            res.status(404).json({ msg: "Building not found" });
            return;
            }


                // Find the project that the building belongs to
                newProject = await NetxProject.findOne({ "buildings._id": newBuilding._id });
                if (!newProject) {
                res.status(404).json({ msg: "Project not found" });
                return;
                }
              else {
                // If a new floor is not provided, use the old floor
                newFloor = oldFloor;
                newBuilding = building;
                newProject = project;
            }

              // Update the room
                room.name = name;
                room.networkPoints = networkPoints;
                room.floor = newFloor._id;
                room.building = newBuilding._id;
                room.project = newProject._id;
                await room.save();

                  // Remove the room from the old floor
                const oldRoomIndex = oldFloor.rooms.findIndex((r: any) => r._id.toString() === roomId);
                if (oldRoomIndex !== -1) {
                    oldFloor.rooms.splice(oldRoomIndex, 1);
                }
                await oldFloor.save();

                // Add the room to the new floor
                newFloor.rooms.push(room);
                await newFloor.save();

                  // Update the rooms array of the old building
                const oldFloorIndex = building.floors.findIndex((f: any) => f._id.toString() === oldFloor._id.toString());
                if (oldFloorIndex !== -1) {
                    building.floors[oldFloorIndex].rooms = oldFloor.rooms;
                }
                await building.save();

                  // Update the floors array of the old project
                const oldBuildingIndex = project.buildings.findIndex((b: any) => b._id.toString() === building._id.toString());
                if (oldBuildingIndex !== -1) {
                    project.buildings[oldBuildingIndex].floors = building.floors;
                }
                await project.save();

                  // Update the rooms array of the new building
                const newFloorIndex = newBuilding.floors.findIndex((f: any) => f._id.toString() === newFloor._id.toString());
                if (newFloorIndex !== -1) {
                    newBuilding.floors[newFloorIndex].rooms = newFloor.rooms;
                }
                await newBuilding.save();


                  // Update the floors array of the new project
                const newBuildingIndex = newProject.buildings.findIndex((b: any) => b._id.toString() === newBuilding._id.toString());
                if (newBuildingIndex !== -1) {
                    newProject.buildings[newBuildingIndex].floors = newBuilding.floors;
                }
                await newProject.save();

                  res.status(200).json({
                    msg: "Room updated successfully",
                    room,
                });

    })


    const deleteRoom = AsyncHandler(async(req: Request , res:Response) => {
        // Define the roomId parameter
                const { roomId } = req.params;

                try {
                // Find the room to be deleted
                const room = await NetxRoom.findByIdAndDelete(roomId) as any;
                    console.log(room);
                    
                if(!room) {                    
                res.status(400).json({
                        msg: "Room does not exist"
                    })
                    return;
                }

                // Find the floor that the room belongs to
                const floor = await NetxFloor.findById(room.floor).populate('building') as any;

                // Find the building that the floor belongs to
                const building = await NetxBuilding.findById(floor.building) as any;

                // Find the project that the building belongs to
                const project = await NetxProject.findOne({ "buildings._id": building._id }) as any

                // Remove the room from the floor
                floor.rooms.pull(room._id);
                await floor.save();

                // Remove the room from the building
                    building.floors.forEach((f: any) => {
                        if (f._id.toString() === floor._id.toString()) {
                        f.rooms.pull(room._id);
                        }
                    });
                    await building.save();

                // Remove the room from the project
                    project.buildings.forEach((b: any) => {
                        if (b._id.toString() === building._id.toString()) {
                        b.floors.forEach((f: any) => {
                            if (f._id.toString() === floor._id.toString()) {
                            f.rooms.pull(room._id);
                            }
                        });
                        }
                    });
                    await project.save();


                res.status(200).json({
                    msg: "Room deleted", 
                    room
                });
                } catch (err) {
                console.error(err);
                res.status(500).send('Server error');
}
    })



export {
    getAllProjects,
    createProject,
    updateBuilding,
    deleteBuilding,
    createBuilding,
    getProject, 
    getBuilding,
    updateProject,
    deleteProject,
    createFloor, 
    updateFloor, 
    deleteFloor,
    getFloor, 
    createRoom,
    updateRoom, 
    deleteRoom
}
