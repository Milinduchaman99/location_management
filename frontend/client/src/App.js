import React from 'react';
import './App.css';
import LocationList from './components/LocationList';
import LocationForm from './components/LocationForm';
import DeviceList from './components/DeviceList';
import DeviceForm from './components/DeviceForm';

function App() {
  return (
    <div className="App">
      <LocationForm />
      <LocationList />
      <DeviceForm />
      <DeviceList />
    </div>
  );
}

export default App;
