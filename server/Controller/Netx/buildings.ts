import { Request , Response } from 'express';
import {  NetxFloor, NetxRoom, NetxProject, NetxBuilding } from '../../model/netxModel';



// Buildings 

// Controller to create a new building
async function createBuilding(req: Request, res: Response) {
  const { buildingName, isCore, projectId , isRouter , servers } = req.body;
  try {
    // Check if the project exists
    const project = await NetxProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    // Create the building
    const createdBuilding : any = await NetxBuilding.create({
        buildingName, 
        isCore,
        isRouter , 
        servers
    })

    // Add the building to the project
    project.buildings.push(createdBuilding._id);

    // Save the project with the new building
    await project.save();

    return res.status(201).json({ createdBuilding });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to update a building
async function updateBuilding(req: Request, res: Response) {
  const { buildingId } = req.params;
  const { buildingName, isCore , isRouter , servers } = req.body;
  try {
    // Find the building by its ID
    const building = await NetxBuilding.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: 'Building not found.' });
    }

    // Update the building fields
    const updatedBuilding = await NetxFloor.findByIdAndUpdate(buildingId , {
        buildingName, 
        isCore ,
        isRouter , 
        servers
    } , {new: true})

    return res.status(200).json({ updatedBuilding });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to delete a floor
async function deleteBuilding(req: Request, res: Response) {
  const { buildingId } = req.params;
  try {
    // Find the building by its ID
    const building = await NetxBuilding.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: 'Building not found.' });
    }

    // Find the project that contains the building
    const project = await NetxProject.findOne({ buildings: buildingId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    await NetxFloor.updateMany(
        { floors: { $in: [buildingId] } },
        { $pull: { floors: buildingId } }
    );

    const deletedBuilding = await NetxBuilding.findByIdAndDelete(buildingId);

    const updatedProject = await NetxProject.findByIdAndUpdate(
      project._id.toString(),
      { $pull: { buildings: buildingId } },
      { new: true }
    );

    return res.status(200).json({ message: 'Building deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to Get a Building
async function getBuilding(req: Request, res: Response) {
  const { buildingId } = req.params;
  console.log(buildingId);
  
  try {
    // Find the building by its ID
    const building = await NetxBuilding.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: 'building not found.' });
    }

    return res.status(200).json({ building });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

export {
    createBuilding, 
    updateBuilding,
    deleteBuilding,
    getBuilding
}

