import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from '../src/Routes/routes';

function App() {
  return (
    <Router>
      {routes}
    </Router>
  );
}

export default App;
