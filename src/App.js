import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Card, ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoutes from './utils/PrivateRoutes';
import AddBooks from './pages/AddBooks';
import HeroPage from './pages/Hero'
import Register from './pages/Register';
import Login from './pages/Login';
import SuperUserPrivateRoute from './utils/SuperUserPrivateRoute'
import ErrorPage from './pages/ErrorPage';
import SingleBook from './pages/SingleBook';
import AdminPanel from './pages/AdminPanel'
import Cart from './pages/Cart';
const App = () => {
  return (
    <ChakraProvider>

      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" exact />
              <Route path="/book/:id" element={<SingleBook />} />
              <Route path="/cart" element={<Cart />} />

            </Route>
            <Route element={<SuperUserPrivateRoute />}>
              <Route element={<AddBooks />} path="/superuser/addBooks" exact />
              <Route element={<AdminPanel />} path="/superuser/getBooks" exact />
            </Route>


            <Route element={<Login />} path="/login" />

            <Route element={<Register />} path="/register" />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  )
}

export default App