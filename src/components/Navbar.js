import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, useToast } from '@chakra-ui/react'
import Logo from '../pages/logo.png'



const Navbar = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const handleOnclick = () => {
        localStorage.removeItem("secret-key")
        localStorage.removeItem("super-secret-key")
        localStorage.removeItem("user_id")
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
                    <Link className="navbar-brand" style={{ color: "black", fontSize: "27px", marginLeft: '20px', marginTop: "20px" }} to="/"><img style={{ width: "70px" }} src={Logo} /></Link>
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
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>
                    <button className='btn btn-danger' onClick={handleOnclick}>Logout</button>
                </div>
            </nav>
            <hr style={{ fontSize: "20px", fontWeight: "bold" }} />

        </>
    )
}

export default Navbar;