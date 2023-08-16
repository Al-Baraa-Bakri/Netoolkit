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
    const results : any = {
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
    const buildingsNetworkPointsNumber = [];
    console.log( "BUILDINGS"  ,project.buildings);
    
    for (const [i , buildingId] of project.buildings.entries()) {
        const building : any = await NetxBuilding.findById(buildingId);
        for (const floorId of building.floors) {
            const floor: any = await NetxFloor.findById(floorId);
            const getNetworkPoints = async () => {
                let countNetworkPoints = 0;
                
                for (const roomId of floor.rooms) {
                    const room: any = await NetxRoom.findById(roomId);                
                    countNetworkPoints += Number(room.networkPoints);
                }
                
                return countNetworkPoints;
            }
            
            const countNetworkPoints = await getNetworkPoints();
            buildingsNetworkPointsNumber.push(countNetworkPoints);
            results.outletBox[`bul${i+1}`] = countNetworkPoints;
            results.dropCableUTP[`bul${i+1}`] = countNetworkPoints;
            results.patchCord[`bul${i+1}`] = countNetworkPoints;
            results.layer3CoreSwitch[`bul${i+1}`] = 1;
            if(countNetworkPoints >= 24) {
                isSwitch24 = false;
            }
            
            if(building.isCore) {
                results.distributedSwitch[`bul${i+1}`] = 1; 
                results.fiberOpticCablesOut[`bul${i+1}`] = 1; 
                results.rack[`bul${i+1}`] = 1;
                results.patchCord10m[`bul${i+1}`] = building.servers.length + 3;
                console.log("CORE", building );
                
            } else {
                results.distributedSwitch[`bul${i+1}`] = 0; 
                results.fiberOpticCablesOut[`bul${i+1}`] = 0; 
                results.rack[`bul${i+1}`] = 0;
            }
        }
        if(isSwitch24) {
            buildingsNetworkPointsNumber.forEach((number , i) => {
                results.accessSwitch24[`bul${i+1}`] = Math.ceil(number / 24);
                results.accessSwitch48[`bul${i+1}`] = 0;
                if(building.isCore) {
                    results.patchCord1m[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] * 2;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] + 2;
                    
                } else {
                    results.patchCord1m[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] * 2 + 1;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`] + 1;
                }
                results.patchPanelUTP[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`];
                results.fiberOpticCablesIN[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`];
                results.wallCabinets[`bul${i+1}`] = results.accessSwitch24[`bul${i+1}`];                
            })
        }
        else {
            buildingsNetworkPointsNumber.forEach((number , i) => {
                results.accessSwitch48[`bul${i+1}`] = Math.ceil(number / 48);
                results.accessSwitch24[`bul${i+1}`] = 0;
                if(building.isCore) {
                    results.patchCord1m[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] * 2;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] + 2;
                } else {
                    results.patchCord1m[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] * 2 + 1;
                    results.patchPanelFiberOptic[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`] + 1;
                }
                results.patchPanelUTP[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`];
                results.fiberOpticCablesIN[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`];
                results.wallCabinets[`bul${i+1}`] = results.accessSwitch48[`bul${i+1}`];     
            })
        }        
    }   
        const resultWithTotals: any = {};
        for (const key in results) {
        if (results.hasOwnProperty(key)) {
            const buildingTotals = Object.values(results[key]);
            const total = buildingTotals.reduce((acc: any, val: any) => acc + val, 0);

            resultWithTotals[key] = { ...results[key], total };
        }
        }
        res.status(200).json({
            results: resultWithTotals
        })

}

export {
    calculate
}