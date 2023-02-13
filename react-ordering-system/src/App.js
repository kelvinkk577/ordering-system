import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customer from './components/Customer';
import Employee from './components/Employee';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Customer/>} />
        <Route path="/employee" element={<Employee/>} />
      </Routes>
    </Router>
  );
}

export default App;
