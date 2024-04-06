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

  return (
    <div>
      <h2>Locations List</h2>
      <ul>
        {locations.map(location => (
          <li key={location._id}>
            {location.name} - {location.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
