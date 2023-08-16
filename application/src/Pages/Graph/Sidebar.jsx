import React from "react";
import AccessPoint from "./images/accessPoint.png";
import Antenna from "./images/antenna.png";
import Cloud from "./images/cloud.png";
import ConPhone from "./images/conPhone.png";
import Building from "./images/buildings.png";
import DishAntenna from "./images/dishAntenna.png";
import EthernetSwitch from "./images/ethernetSwitch.png";
import Firewall from "./images/firewall.png";
import Globe from "./images/globe.png";
import Imac from "./images/imac.png";
import Isp from "./images/isp.png";
import Printer from "./images/printer.png";
import Router from "./images/router.png";
import Satellite from "./images/satellite.png";
import Scanner from "./images/scanner.png";
import Server from "./images/server.png";
import Signal from "./images/signal.png";
import Switch from "./images/switch.png";

const NODES = [
  {
    type: "accessPointNode",
    imgSrc: AccessPoint,
  },
  {
    type: "antennaNode",
    imgSrc: Antenna,
  },
  {
    type: "cloudNode",
    imgSrc: Cloud,
  },
  {
    type: "conPhoneNode",
    imgSrc: ConPhone,
  },
  {
    type: "buildingNode",
    imgSrc: Building,
  },
  {
    type: "dishAntennaNode",
    imgSrc: DishAntenna,
  },
  {
    type: "ethernetSwitchNode",
    imgSrc: EthernetSwitch,
  },
  {
    type: "firewallNode",
    imgSrc: Firewall,
  },
  {
    type: "globeNode",
    imgSrc: Globe,
  },
  {
    type: "imacNode",
    imgSrc: Imac,
  },
  {
    type: "ispNode",
    imgSrc: Isp,
  },
  {
    type: "printerNode",
    imgSrc: Printer,
  },
  {
    type: "routerNode",
    imgSrc: Router,
  },
  {
    type: "satelliteNode",
    imgSrc: Satellite,
  },
  {
    type: "scannerNode",
    imgSrc: Scanner,
  },
  {
    type: "serverNode",
    imgSrc: Server,
  },
  {
    type: "signalNode",
    imgSrc: Signal,
  },
  {
    type: "switchNode",
    imgSrc: Switch,
  },
];

const DIAGRAM_NODES = [
  {
    type: "rectNode",
    jsx: (
      <div
        onDragStart={(event) => onDragStart(event, node.type)}
        draggable
        className="w-20 h-10 border border-gray-dark"
      >
        <span className="text-white">Rectangle</span>
      </div>
    ),
  },
];

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="grid grid-cols-2 gap-y-6 h-max justify-items-center items-center max-w-[180px] ">
      {NODES.map((node) => {
        return (
          <div
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
            className="h-8 w-8"
          >
            <img src={node.imgSrc} alt={`${node.type} Node`} />
          </div>
        );
      })}
      {/* Rect */}
      <div
        onDragStart={(event) => onDragStart(event, "rectNode")}
        draggable
        className="w-20 h-10 border border-gray-dark"
      ></div>
      {/* Square */}
      <div
        onDragStart={(event) => onDragStart(event, "circleNode")}
        draggable
        className="w-10 h-10 border border-gray-dark rounded-full"
      ></div>
      {/* Rounded Rect */}
      <div
        onDragStart={(event) => onDragStart(event, "rectNode")}
        draggable
        className="w-20 h-10 border rounded-md border-gray-dark"
      ></div>
    </aside>
  );
};
