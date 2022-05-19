import Header from './components/Header';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Views/Dashboard';
import SignInSide from './Views/SignInSide';
import Register from './Views/Register';

function App() {
  return (
    <>
    <Header/>
    <Router>
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  </Router>
  </>
  );
}

export default App;
