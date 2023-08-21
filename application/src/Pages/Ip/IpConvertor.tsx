import React, { useState } from 'react';

const IPv4ToIPv6Converter = () => {
  const [ipv4Address, setIPv4Address] = useState('');
  const [ipv6Address, setIPv6Address] = useState('');

  const convertIPv4ToIPv6 = (ipv4) => {
    const ipv4Segments = ipv4.split('.');
    const ipv6Segments = ['2002', '0000', '0000', '0000', '0000', '0000'];

    for (let i = 0; i < 4; i++) {
      const hexSegment = parseInt(ipv4Segments[i], 10).toString(16).padStart(2, '0');
      ipv6Segments.push(hexSegment);
    }

    return ipv6Segments.join(':');
  };

  const handleConversion = () => {
    const ipv6 = convertIPv4ToIPv6(ipv4Address);
    setIPv6Address(ipv6);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">IPv4 to IPv6 Converter</h1>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Enter IPv4 Address"
          className="p-2 border rounded"
          value={ipv4Address}
          onChange={(e) => setIPv4Address(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleConversion}
      >
        Convert
      </button>

      {ipv6Address && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">IPv6 Address:</h2>
          <p className="mt-2">{ipv6Address}</p>
        </div>
      )}
    </div>
  );
};

export default IPv4ToIPv6Converter;
