import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import LogoNode from './NewNode';
import './index.css';
import AccessPoint from './Nodes/AccessPoint';
import AntennaNode from './Nodes/AntennaNode';
import CloudNode from './Nodes/CloudNode';
import ConferencePhoneNode from './Nodes/ConferencePhoneNode';

import EthernetSwitch from "./Nodes/EthernetSwitchNode";
import BuildingsNode from './Nodes/BuildingsNode';
import DishAntennaNode from './Nodes/DishAntennaNode';
import FirewallNode from './Nodes/FirewallNode';
import GlobeNode from './Nodes/GlobeNode';
import ImacNode from './Nodes/ImacNode';
import IspNode from './Nodes/IspNode';
import PrinterNode from './Nodes/PrinterNode';
import RouterNode from './Nodes/RouterNode';
import SatelliteNode from './Nodes/SatelliteNode';
import ScannerNode from './Nodes/ScannerNode';
import ServerNode from './Nodes/ServerNode';
import SignalNode from './Nodes/SignalNode';
import SwitchNode from './Nodes/SwitchNode';
import Rectangle from './Nodes/Digram/Rectangle';
import Square from './Nodes/Digram/Circle';
import Circle from './Nodes/Digram/Circle';
import { exportComponentAsJPEG } from 'react-component-export-image';


const edgeOptions = {
  animated: true,
};

const nodeTypes = 
  {
    logoNode: LogoNode ,
    accessPointNode: AccessPoint,
    antennaNode: AntennaNode,
    cloudNode: CloudNode,
    conPhoneNode: ConferencePhoneNode,
    buildingNode: BuildingsNode,
    dishAntennaNode : DishAntennaNode ,
    ethernetSwitchNode : EthernetSwitch ,
    firewallNode : FirewallNode,
    globeNode : GlobeNode,
    imacNode : ImacNode,
    ispNode : IspNode,
    printerNode : PrinterNode,
    routerNode : RouterNode,
    satelliteNode : SatelliteNode,
    scannerNode : ScannerNode,
    serverNode : ServerNode,
    signalNode : SignalNode,
    switchNode : SwitchNode,
    rectNode: Rectangle, 
    circleNode: Circle
  }
 

const initialNodes = [

];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [resizableVisible, setResizableVisible] = useState(true);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const graphRef = useRef(null); 
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

    const updateNodeData = (nodeId, newData) => {
    console.log(nodes);
    
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  };

    const onNodeMouseEnter = (event, node) => {
      console.log(node);
      
    setSelectedNode(node);
    setResizableVisible(true);
    updateNodeData(node.id , {
      hoveredNode: node
    })
    
  };

  const onNodeMouseLeave = (event , node) => {
    setSelectedNode(null);
    setResizableVisible(false);
    updateNodeData(node.id , {
      hoveredNode: null
    })
  };


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        deletable: true, 
        selected: true,
        width: 50, // Set the width of the node
        height: 50, // Set the height of the node,
        delectable: true,
        data: {
          hoveredNode: null, 
          nodeSize: {
            height: 10, 
            width: 10
          }
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultEdgeOptions={edgeOptions}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
      <button onClick={() => exportComponentAsJPEG(reactFlowWrapper)} className='absolute py-2 bg-primary w-[80px] text-white rounded-md'>
        Save
      </button>
    </div>
  );
};

export default DnDFlow;
