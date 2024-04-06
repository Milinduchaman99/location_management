import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get('/api/devices')
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  }, []);

  return (
    <div>
      <h2>Devices</h2>
      <ul>
        {devices.map(device => (
          <li key={device._id}>
            <div>Serial Number: {device.serialNumber}</div>
            <div>Type: {device.type}</div>
            <div>Status: {device.status}</div>
            {device.image && (
              <div>
                <img src={device.image} alt="Device" style={{ maxWidth: '200px' }} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
