import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { NodeResizer } from '@reactflow/node-resizer';
import Image from "../images/antenna.png";
import '@reactflow/node-resizer/dist/style.css';
import styles from './style.module.css';
export default memo(({id,
  data, } : any) => {
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
  return (
        <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        className={styles.node}
      >
        <div
          ref={rotateControlRef}
          style={{
            display: data.hoveredNode?.type === 'antennaNode' ? 'block' : 'none',
          }}
          className={`nodrag ${styles.rotateHandle}`}
        />

      <NodeResizer minWidth={100} minHeight={100} maxHeight={300} maxWidth={200} color="#9794945c" isVisible={data.hoveredNode?.type === 'antennaNode'}/>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "gray" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <img  src={Image} className="max-h-24 max-w-24 object-contain" onClick={(event) => console.log(event)
      }/>
      </div>
      <span className='text-center w-full block text-gray-dark text-lg'> Antenna </span>
    </>
  );
});
