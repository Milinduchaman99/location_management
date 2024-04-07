import React, { useState } from 'react';
import ApiService from '../services/ApiService';

function LocationForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleLocationSubmit = async () => {
    const locationData = { name, address, phone };
    await ApiService.createLocation(locationData);
    setName('');
    setAddress('');
    setPhone('');
  };

  const handleDeviceSubmit = async () => {
    const deviceData = { serialNumber, imageURL, type, status };
    await ApiService.createDevice(deviceData);
    setSerialNumber('');
    setImage(null);
    setType('');
    setStatus('');
    setImageURL(''); // Clear the image URL after submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      await uploadImage(); // Upload image before submitting device data
    }
    await handleLocationSubmit();
    await handleDeviceSubmit();
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/devices/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImageURL(data.imageUrl); // Assuming server returns image URL after upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label> <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br></br>
      <label>Address: </label> <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} /><br></br>
      <label>Phone: </label> <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>
      <label>Serial Number: </label><input type="text" placeholder="Serial Number" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} /><br></br>
      <label>Image: </label><input type="file" onChange={handleImageChange} /><br />
      <label>Type: </label><input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} /><br></br>
      <label>Status: </label><input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} /><br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LocationForm;
