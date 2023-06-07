import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoutes from './utils/PrivateRoutes';
import AddBooks from './pages/AddBooks';
import HeroPage from './pages/Hero'

const App = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <div className="App">
        <Router>
          <Routes>
            {/* <Route element={<PrivateRoutes />}>

              <Route element={<AddEvent />} path="/addevent" exact />

              <Route element={<Myevents />} path="/myevents" exact />
            </Route> */}
            <Route element={<Home />} path="/" exact />
            {/* <Route element={<Home />} path="/home" exact /> */}
            <Route element={<AddBooks />} path="/superuser/addBooks" exact />
            {/* <Route element={<Login />} path="/login" />

            <Route element={<Register />} path="/register" /> */}
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  )
}

export default App