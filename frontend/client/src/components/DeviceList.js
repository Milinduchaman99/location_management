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

  const updateDevice = async (deviceId, updatedData) => {
    try {
      await ApiService.updateDevice(deviceId, updatedData); // Use the API service to update the location
      // Optionally, you can refresh the list after updating
      const response = await ApiService.getDevices();
      setDevices(response.data);
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };
  
  // Function to delete a location
  const deleteDevice = async (deviceId) => {
    try {
      await ApiService.deleteDevice(deviceId); // Use the API service to delete the location
      // Optionally, you can refresh the list after deleting
      const response = await ApiService.getDevices();
      setDevices(response.data);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  return (
    <div>
      <h2>Device List</h2>
      <ul>
        {devices.map(device => (
          <li key={device._id}>
            {device.serialNumber} - {device.type} - {device.image} - {device.status}
            <button onClick={() => updateDevice(device._id, { })}>Update</button>
            <button onClick={() => deleteDevice(device._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeviceList;
