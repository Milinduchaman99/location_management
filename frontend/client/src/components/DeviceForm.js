import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function DeviceForm() {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { serialNumber, type, status };
    await ApiService.createDevice(data);
    setSerialNumber('');
    setType('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
      <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <button type="submit">Add Device</button>
    </form>
  );
}

export default DeviceForm;
