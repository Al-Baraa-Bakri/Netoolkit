import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setName,
  addFloor,
  addRoom,
  setRoomName,
  setRoomNetworkPoints,
} from "../../Store/slices/Netx/createBuildingSlice";

function BuildingForm() {
  const dispatch = useDispatch();
  const { name, floors } = useSelector((state) => state.netxBuilding);

  const onNameChange = (event) => {
    dispatch(setName(event.target.value));
  };

  const onAddFloor = () => {
    dispatch(addFloor({ name: `Floor ${floors.length + 1}`, rooms: [] }));
  };

  const onAddRoom = (floorIndex) => {
    dispatch(
      addRoom({
        floorIndex,
        room: { name: `Room ${floors[floorIndex].rooms.length + 1}`, networkPoints: 0 },
      })
    );
  };

  const onRoomNameChange = (floorIndex, roomIndex, event) => {
    dispatch(setRoomName({ floorIndex, roomIndex, name: event.target.value }));
  };

  const onRoomNetworkPointsChange = (floorIndex, roomIndex, event) => {
    dispatch(
      setRoomNetworkPoints({
        floorIndex,
        roomIndex,
        networkPoints: parseInt(event.target.value),
      })
    );
  };

  return (
    <div>
      <label>
        Building name:
        <input type="text" value={name} onChange={onNameChange} />
      </label>

      <button onClick={onAddFloor}>Add floor</button>

      {floors.map((floor, floorIndex) => (
        <div key={floorIndex}>
          <h2>{floor.name}</h2>

          <button onClick={() => onAddRoom(floorIndex)}>Add room</button>

          {floor.rooms.map((room, roomIndex) => (
            <div key={roomIndex}>
              <label>
                Room name:
                <input
                  type="text"
                  value={room.name}
                  onChange={(event) => onRoomNameChange(floorIndex, roomIndex, event)}
                />
              </label>

              <label>
                Network points:
                <input
                  type="number"
                  value={room.networkPoints}
                  onChange={(event) =>
                    onRoomNetworkPointsChange(floorIndex, roomIndex, event)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BuildingForm;