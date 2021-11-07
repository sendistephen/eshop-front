import { Header, Navbar } from 'components';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from 'Routes';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes />
    </Router>
  );
}

export default App;
