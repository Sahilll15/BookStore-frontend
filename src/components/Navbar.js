import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, useToast } from '@chakra-ui/react'
import Logo from '../pages/logo.png'



const Navbar = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const superuser = localStorage.getItem('super-secret-key')
    const user_name = localStorage.getItem('user_name')
    const handleOnclick = () => {
        localStorage.removeItem("secret-key")
        localStorage.removeItem("super-secret-key")
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_name")
        navigate('/login')
        toast({
            title: "Logged out",
            description: "You have been logged out",
            status: "success",
            duration: 9000,
            isClosable: true,
        })

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ color: "black", fontSize: "25px", marginLeft: '20px', marginTop: "20px" }} to="/">Readify</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ marginTop: "20px", fontSize: "20px" }}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" >Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Pricing</a>
                            </li>
                            {
                                superuser ? (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/superuser/addBooks">AddBooks</Link>
                                    </li>
                                ) : null
                            }


                        </ul>
                    </div>
                    <button className='btn btn-danger' style={{ marginTop: "10px" }} onClick={handleOnclick}>Logout</button>
                    <div style={{ marginLeft: "auto", marginTop: "9px", fontSize: "20px" }}>
                        <Link className="nav-link" ><i className="fas fa-user"></i></Link>
                    </div>


                    <div style={{ marginLeft: "auto", marginRight: "20px", marginTop: "20px", fontSize: "20px" }}>

                        <p style={{ color: "black", fontSize: "20px" }}>Welcome, {user_name}</p>
                    </div>
                    <div style={{ marginLeft: "auto", marginTop: "9px", fontSize: "20px" }}>
                        <Link className="nav-link" to='/cart' ><i className=" fas  fa-shopping-cart"></i></Link>
                    </div>
                </div>
            </nav>
            <hr style={{ fontSize: "20px", fontWeight: "bold" }} />

        </>
    )
}

export default Navbar;