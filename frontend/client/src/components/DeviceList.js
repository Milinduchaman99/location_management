import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function fetchDevices() {
      const response = await ApiService.getDevices();
      setDevices(response.data);
    }
    fetchDevices();
  }, []);

  return (
    <div>
      <h1>Devices</h1>
      <ul>
        {devices.map(device => (
          <li key={device._id}>
            {device.serialNumber} - {device.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceList;
