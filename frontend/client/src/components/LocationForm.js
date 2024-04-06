import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function LocationForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, address };
    await ApiService.createLocation(data);
    setName('');
    setAddress('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Add Location</button>
    </form>
  );
}

export default LocationForm;
