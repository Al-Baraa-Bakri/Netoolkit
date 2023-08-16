import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, NodeResizeControl, Position, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
const controlStyle = {
  background: 'transparent',
  border: 'none',
  width: '20px', 
  heigh: '40px', 
  display: 'flex' , 
  justifyContent: 'center', 
  alignItems: 'center'
};
const RectangleNode = ({ id, data }) => {
  console.log("DATA" , data);
  
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);


  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  const onresize = (event , ResizeParamsWithDirection) => {
    console.log("REESS" , ResizeParamsWithDirection);
    
  }
  return (
    <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
          width: '50px'
        }}
      >
        {/* ... Rectangle content ... */}
        {/* <Handle
          type="target"
          position={Position.Left}
          style={{ background: 'gray' }}
          onConnect={(params) => console.log('handle onConnect', params)}
        /> */}
        {/* ... Rectangle content ... */}
      </div>
      <NodeResizer  onResize={(event , ResizeParamsWithDirection) => onresize(event , ResizeParamsWithDirection)} color='#4a4545' isVisible={data?.hoveredNode?.type === 'circleNode'} minHeight={50} minWidth={50}/>
        <div
        className="min-h-[50px] min-w-[50px] h-full w-full border border-gray-dark bg-white flex justify-center items-center rounded-full"
      >
        <input type={'text'} className='w-[90%] h-[20px] outline-none border-none rounded-sm text-gray-dark'/>
      </div>
    </>
  );
};

export default memo(RectangleNode);
