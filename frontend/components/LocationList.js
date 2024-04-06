import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('/api/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map(location => (
          <li key={location._id}>
            {location.name} - {location.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
