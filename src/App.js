// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './Screen/UserList/UserList';
import UserForm from './Screen/UserForm/UserForm';
import UserDetails from './Screen/UserDetails/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/view/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

