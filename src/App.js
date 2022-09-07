import Header from './components/Header';
import './App.css';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInSide from './Views/Login';
import Register from './Views/Register';
import {useState, useEffect} from 'react'
import Home from './Views/Home';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [displayRegister, setDisplayRegister] = useState(true)
  const [displayLogin, setDisplayLogin] = useState(false)

  useEffect(()=>{
    let localUser = localStorage.getItem("user")
    if (localUser) {
    localUser = JSON.parse(localUser)
    setCurrentUser(localUser)
  }
  },[])

  const login = (user) => {
    let current = user
    setCurrentUser(current)
    localStorage.setItem('user',JSON.stringify(user))
  }

  const logOut = () => {
    setCurrentUser(null)
  }


  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));



  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Header/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <DrawerHeader/>
    <Router>
    <Routes>
      <Route path="/" element={<Home currentUser={currentUser} logOut={logOut}/>}>
        <Route path="/login" element={<SignInSide login={login}/>} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  </Router>
  </Box>
  </Box>
  </>
  );
}

export default App;
