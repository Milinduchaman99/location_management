import React from 'react';
import './App.css';
import LocationList from './components/LocationList';
import LocationForm from './components/LocationForm';
import DeviceList from './components/DeviceList';

function App() {
  return (
    <div className="App">
      <h1>Locations</h1>
      <LocationForm />
      <LocationList />
      <DeviceList />
    </div>
  );
}

export default App;
