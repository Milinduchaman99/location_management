import React, { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await ApiService.getLocations();
      setLocations(response.data);
    }
    fetchLocations();
  }, []);

  const updateLocation = async (locationId, updatedData) => {
    try {
      await ApiService.updateLocation(locationId, updatedData); // Use the API service to update the location
      // Optionally, you can refresh the list after updating
      const response = await ApiService.getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };
  
  // Function to delete a location
  const deleteLocation = async (locationId) => {
    try {
      await ApiService.deleteLocation(locationId); // Use the API service to delete the location
      // Optionally, you can refresh the list after deleting
      const response = await ApiService.getLocations();
      setLocations(response.data);
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div>
      <h2>Locations List</h2>
      <ul>
        {locations.map(location => (
          <li key={location._id}>
            {location.name} - {location.address} - {location.phone}
            <button onClick={() => updateLocation(location._id, { name: 'New Name', address: 'New Address', phone: 'New Phone' })}>Update</button>
            <button onClick={() => deleteLocation(location._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
