import express, { Express, Request, Response } from 'express';
import { createBuilding, createFloor, createProject, createRoom, deleteBuilding, deleteFloor, deleteProject, deleteRoom, getAllProjects, getBuilding, getFloor, getProject, updateBuilding, updateFloor, updateProject, updateRoom } from '../Controller/netxController';
import { checkJwt } from '../middleware/auth';
const router = express.Router();

router.route('/').get(getAllProjects).post(createProject); 
router.route('/:projectId').get(getProject).put(updateProject).delete(deleteProject);
// Buildings
router.route('/building').post(createBuilding);
router.route('/building/:buildingId').get(getBuilding).put(updateBuilding).delete(deleteBuilding); 

// Floors
router.route('/floor').post(createFloor);
router.route('/floor/:floorId').get(getFloor).put(updateFloor).delete(deleteFloor); 

// Rooms 
router.route('/room').post(createRoom); 
router.route('/room/:roomId').get().put(updateRoom).delete(deleteRoom)
export default router;