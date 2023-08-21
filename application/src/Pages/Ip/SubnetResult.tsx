import React from 'react';

const SubnetResults = ({ subnetInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-light p-8 mt-4">
      <h2 className="text-2xl font-semibold mb-4">Subnet Information</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="mb-2"><span className="font-semibold">Network Address:</span> {subnetInfo.networkAddress}</p>
          <p className="mb-2"><span className="font-semibold">First Address:</span> {subnetInfo.firstAddress}</p>
          <p className="mb-2"><span className="font-semibold">Last Address:</span> {subnetInfo.lastAddress}</p>
        </div>
        <div>
          <p className="mb-2"><span className="font-semibold">Broadcast Address:</span> {subnetInfo.broadcastAddress}</p>
          <p className="mb-2"><span className="font-semibold">Subnet Mask:</span> {subnetInfo.subnetMask}</p>
          <p className="mb-2"><span className="font-semibold">Usable IP Range:</span> {subnetInfo.firstAddress} - {subnetInfo.lastAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default SubnetResults;
