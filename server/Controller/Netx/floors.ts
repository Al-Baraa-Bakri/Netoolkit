import { Request , Response } from 'express';
import {  NetxFloor, NetxRoom, NetxProject, NetxBuilding } from '../../model/netxModel';



// Floors 

// Controller to create a new floor
async function createFloor(req: Request, res:Response) {
  const { floorName, isCore , buildingId } = req.body;
  try {
    // Check if the building exists
    const building = await NetxBuilding.findById(buildingId);
    console.log("Bul" , building );
    
    if (!building) {
      return res.status(404).json({ error: 'Building not found.' });
    }

    // Create the floor
    const createdFloor : any = await NetxFloor.create({
        floorName, 
        isCore, 
        building: buildingId
    })

    // Add the floor to the building
    building.floors.push(createdFloor._id);

    // Save the building with the new floor
    await building.save();

    return res.status(201).json({ createdFloor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}


// Controller to update a floor
async function updateFloor(req: Request, res: Response) {
  const { floorId } = req.params;
  const { floorName, isCore } = req.body;
  try {
    // Find the floor by its ID
    const floor = await NetxFloor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found.' });
    }

    // Update the floor fields
    const updatedFloor = await NetxFloor.findByIdAndUpdate(floorId , {
        floorName, 
        isCore
    } , {new: true})

    return res.status(200).json({ updatedFloor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to delete a floor
async function deleteFloor(req: Request, res: Response) {
  const { floorId } = req.params;
  try {
    // Find the floor by its ID
    const floor = await NetxFloor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found.' });
    }

    // Find the building that contains the floor
    const building = await NetxBuilding.findOne({ floors: floorId });
    if (!building) {
      return res.status(404).json({ error: 'Building not found.' });
    }

    await NetxRoom.updateMany(
        { floor: floorId },
        { $unset: { floor: 1 } }
    );

    const deletedFloor = await NetxFloor.findByIdAndDelete(floorId);

    const updatedBuilding = await NetxBuilding.findByIdAndUpdate(
      building._id.toString(),
      { $pull: { floors: floorId } },
      { new: true }
    );

    return res.status(200).json({ message: 'Floor deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to Get a floor
async function getFloor(req: Request, res: Response) {
  const { floorId } = req.params;
  try {
    // Find the floor by its ID
    const floor = await NetxFloor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found.' });
    }

    return res.status(200).json({ floor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}



export {
  createFloor, 
  deleteFloor,
  updateFloor, 
  getFloor
}