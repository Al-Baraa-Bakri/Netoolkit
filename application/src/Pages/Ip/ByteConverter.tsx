import React, { useState } from 'react';

function convertBytes(value, fromUnit, toUnit) {
    const units = {
        B: 0,
        KB: 1,
        MB: 2,
        GB: 3,
        TB: 4
    };

    const byteSize = value * Math.pow(1024, units[fromUnit]);
    const convertedSize = byteSize / Math.pow(1024, units[toUnit]);

    return convertedSize;
}

function ByteConverter() {
    const [value, setValue] = useState(0);
    const [fromUnit, setFromUnit] = useState('B');
    const [toUnit, setToUnit] = useState('B');
    const [result, setResult] = useState(0);

    const handleConvert = () => {
        const convertedValue = convertBytes(value, fromUnit, toUnit);
        setResult(convertedValue.toFixed(5)); // Format result with 5 decimal places
    };


    return (
        <div className='mt-12'>
            <h2 className="text-2xl font-semibold mb-4">Byte Unit Converter</h2>
            <input className='mr-4 px-2 py-1' type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <select className="px-2 py-1 border rounded-md mb-2 mr-4" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                <option value="B">Bytes</option>
                <option value="KB">Kilobytes</option>
                <option value="MB">Megabytes</option>
                <option value="GB">Gigabytes</option>
                <option value="TB">Terabytes</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded me-4" onClick={handleConvert}>Convert</button>
            <select  className="px-2 py-1 border rounded-md mb-2" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                <option value="B">Bytes</option>
                <option value="KB">Kilobytes</option>
                <option value="MB">Megabytes</option>
                <option value="GB">Gigabytes</option>
                <option value="TB">Terabytes</option>
            </select>
            <p className="font-semibold">Result: {result}</p>
        </div>
    );
}

export default ByteConverter;
