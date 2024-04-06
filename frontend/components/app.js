import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LocationList from './LocationList';
import DeviceList from './DeviceList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/locations" component={LocationList} />
        <Route exact path="/devices" component={DeviceList} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
