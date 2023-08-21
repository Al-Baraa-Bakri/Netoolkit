import { Request , Response } from 'express';
import { NetxBuilding, NetxFloor, NetxProject, NetxRoom } from '../../model/netxModel';

async function calculate(req: Request , res: Response) {
        const { projectId } = req.params; 
    const project = await NetxProject.findById(projectId);
    if(!project) {
        return res.status(404).json({
            msg: "Project not found"
        })
    }
    let results : any = {
        outletBox: {}, 
        dropCableUTP: {},
        patchCord: {},
        accessSwitch24: {},
        accessSwitch48: {},
        distributedSwitch: {},
        patchPanelUTP: {}, 
        fiberOpticCablesIN: {}, 
        wallCabinets: {},
        fiberOpticCablesOut: {}, 
        patchCord1m: {},
        patchPanelFiberOptic: {},
        rack: {}, 
        layer3CoreSwitch: {},
        patchCord10m: {}
    }
    let isSwitch24 = true;
    let buildingNetworkPointsNumber;
    try {
        for (const [i , buildingId] of project.buildings.entries()) {
        const building : any = await NetxBuilding.findById(buildingId);
          let nc = 0;
          let countNetworkPoints = 0;
          for (const floorId of building.floors) {
            const floor: any = await NetxFloor.findById(floorId);
            const getNetworkPoints = async () => {
                for (const roomId of floor.rooms) {
                    const room: any = await NetxRoom.findById(roomId);                
                    nc += Number(room.networkPoints) * room.count;
                }
                return nc;
            }
            
            countNetworkPoints = await getNetworkPoints();
            
            results.outletBox[`bul${i+1}`] = countNetworkPoints;
            results.dropCableUTP[`bul${i+1}`] = countNetworkPoints;
            results.patchCord1m[`bul${i+1}`] = countNetworkPoints;
            results.layer3CoreSwitch[`bul${i+1}`] = 1;
            if(countNetworkPoints >= 24) {
                isSwitch24 = false;
            }
            
            if(building.isCore) {
                results.distributedSwitch[`bul${i+1}`] = 0; 
                results.fiberOpticCablesOut[`bul${i+1}`] = 0; 
                results.rack[`bul${i+1}`] = 1;
                const serversLength = building.servers.filter((s: any) => s !== 'FireWall' && s !== 'Proxy Server').length
                results.patchCord10m[`bul${i+1}`] = serversLength + 3;
                
            } else {
                results.distributedSwitch[`bul${i+1}`] = 1; 
                results.fiberOpticCablesOut[`bul${i+1}`] = 1; 
                results.patchCord10m[`bul${i+1}`] = 0;
                results.rack[`bul${i+1}`] = 0;
            }
        }
        buildingNetworkPointsNumber = countNetworkPoints;
        if(isSwitch24) {

                results.accessSwitch24[`bul${i+1}`] = Math.ceil(buildingNetworkPointsNumber / 24);
                results.accessSwitch48[`bul${i+1}`] = 0;
                if(building.isCore) {
                    results.patchCord[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] * 2;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] + 2;
                    
                } else {
                    results.patchCord[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] * 2 + 1;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] + 1;
                }
                results.patchPanelUTP[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`];
                results.fiberOpticCablesIN[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`];
                results.wallCabinets[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`];                
        }
        else {
                results.accessSwitch48[`bul${i+1}`] = Math.ceil(buildingNetworkPointsNumber / 48);
                results.accessSwitch24[`bul${i+1}`] = 0;
                if(building.isCore) {                    
                    results.patchCord[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] * 2;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] + 1;
                } else {
                    results.patchCord[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] * 2 + 1;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] + 2;
                }
                results.patchPanelUTP[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`];
                results.fiberOpticCablesIN[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`];
                results.wallCabinets[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`];     

        }        
    }   

        const resultWithTotals: any = {};
        for (const key in results) {
        if (results.hasOwnProperty(key)) {
            const buildingTotals = Object.values(results[key]);
            const total = buildingTotals.reduce((acc: any, val: any) => acc + val, 0);
            if(Object.values(results[key]).length > project.buildings.length) {
                Object.keys(results[key]).forEach((r , i) => {
                    if(i >= project.buildings.length) {
                        delete results[key][r];
                    } else {
                        return results[key];
                    }
                })
                
            }
            resultWithTotals[key] = { ...results[key], total };
        }
        }
        
        res.status(200).json({
            results: resultWithTotals
        })
    } catch (error) {
        console.log(error);
        
    }


}

export {
    calculate
}