import React, { useState } from 'react';
import axiosInstance from '../../Logic/axios';
import SubnetResults from './SubnetResult';
import IPv4ToIPv6Converter from './IpConvertor';
import ByteConverter from './ByteConverter';

const SubnetCalculator = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [subnetMask, setSubnetMask] = useState('');
  const [ipError, setIpError] = useState('');
  const [maskError, setMaskError] = useState('');
  const [subnetResult , setSubnetResult] = useState('');
  const [networkAddress, setNetworkAddress] = useState('');
  // Other state variables for results

  const validateIpAddress = (value) => {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipPattern.test(value);
  };

  const validateSubnetMask = (value) => {
    const maskPattern = /^(\/[0-9]{1,2})?$/;
    return maskPattern.test(value);
  };

  const handleIpAddressChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);
    if (!validateIpAddress(value)) {
      setIpError('Invalid IP address format');
    } else {
      setIpError('');
    }
  };

  const handleSubnetMaskChange = (e) => {
    const value = e.target.value;
    setSubnetMask(value);
    if (!validateSubnetMask(value)) {
      setMaskError('Invalid subnet mask format');
    } else {
      setMaskError('');
    }
  };

  const calculateSubnet = async() => {
    if (!validateIpAddress(ipAddress) || !validateSubnetMask(subnetMask)) {
      // Display error message or prevent calculation
      return;
    }

    console.log(`${ipAddress}${subnetMask}`);

    const { data } = await axiosInstance({
      method: 'POST' , 
      url: 'http://localhost:5000/api/ipSubnet', 
      data: {
        cidrSubnet: `${ipAddress}${subnetMask}`
      }
    })  
    setSubnetResult(data.subResult)
    
    

    // Implement the subnet calculation logic here
    // Update state with calculated results
  };

  return (
    <div className="p-4 bg-app-background-light">
      <h1 className="text-2xl font-bold mb-4">IP Subnet Calculator</h1>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter IP Address"
          className={`p-2 border rounded ${ipError ? 'border-red-500' : ''}`}
          value={ipAddress}
          onChange={handleIpAddressChange}
        />
        {ipError && <p className="text-red-500">{ipError}</p>}
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter Subnet Mask"
          className={`p-2 border rounded ${maskError ? 'border-red-500' : ''}`}
          value={subnetMask}
          onChange={handleSubnetMaskChange}
        />
        {maskError && <p className="text-red-500">{maskError}</p>}
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={calculateSubnet}
      >
        Calculate
      </button>
      {/* Display calculated results here */}
      <SubnetResults subnetInfo={subnetResult}/>
      <ByteConverter />
    </div>
  );
};

export default SubnetCalculator;
