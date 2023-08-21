import { Request , Response } from 'express';
import {  NetxFloor, NetxRoom } from '../../model/netxModel';



// Rooms 

// Controller to create a new room
async function createRoom(req: Request, res:Response) {
  
  const { roomName, networkPoints, floorId , count } = req.body;
            console.log("ROOM CO" , count);

  try {
    // Check if the floor exists
    const floor = await NetxFloor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found.' });
    }

    // Create the room
    const newRoom: any = await NetxRoom.create({
      roomName,
      networkPoints,
      floor: floor._id, 
      count
    });

    // Add the room to the floor

    floor.rooms.push(newRoom._id);

    // Save the floor with the new room
    await floor.save();

    return res.status(201).json({ room: newRoom });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

// Controller to update a room
async function updateRoom(req: Request, res:Response) {
  const { roomId } = req.params;
  const { roomName, networkPoints } = req.body;
  try {
    // Find the room by its ID
    const room = await NetxRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    // Update the room fields
    const updatedRoom = await NetxRoom.findByIdAndUpdate(roomId , {
      roomName, 
      networkPoints
    } , {new: true})

    return res.status(200).json({ updatedRoom });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

async function deleteRoom(req: Request, res: Response) {
  const { roomId } = req.params;
  try {
    // Find the room by its ID
    const room = await NetxRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    // Find the floor that contains the room
    const floor = await NetxFloor.findOne({ rooms: roomId });
    if (!floor) {
      return res.status(404).json({ error: 'Floor not found.' });
    }
    
    // Remove the room from the floor
    await NetxRoom.findByIdAndDelete(roomId); 
    const updatedFloor = await NetxFloor.findByIdAndUpdate(
      floor._id.toString(),
      { $pull: { rooms: roomId } },
      { new: true } // Return the updated document
    );
    return res.status(200).json({ message: 'Room deleted successfully.' , updatedFloor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}

const getRoom = async (req: Request , res: Response) => {
  const { roomId } = req.params;
  
  const room = await NetxRoom.findById(roomId); 
  if(!room) {
    return res.status(404).json({
      msg: "Room not found"
    })
  }

  res.status(200).json({
    room
  })
}


export {
  createRoom, 
  deleteRoom,
  updateRoom, 
  getRoom
}