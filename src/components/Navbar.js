import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" style={{ color: "black", fontSize: "27px", marginLeft: '20px', marginTop: "20px" }} to="/">Readify</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav" style={{ marginTop: "20px", fontSize: "20px" }}>
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" >Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" >Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" >Pricing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr style={{ fontSize: "20px", fontWeight: "bold" }} />

        </>
    )
}

export default Navbar;