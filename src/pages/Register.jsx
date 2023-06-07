import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useToast, ToastProvider, Box } from "@chakra-ui/react";
import Logo from './logo.png'
import { NavLink } from "react-router-dom";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://bookstore-ksae.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (response.ok) {
        console.log(json);
        toast({
          title: "Register Success",
          description: "You are successfully registered",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Register Failed",
        description: "Please check your credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
   <div className="login-container">
        <div className="login-form">
        <img style={{width:"25%",height:"340px",marginBottom:"100px"}} src={Logo} alt="Error" className="error-image" />
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            {" "}
            <input
              type="text"
              placeholder="username"
              name="name"
              onChange={onChange}
              required
            />
            <input
              type="text"
              placeholder="user@gmail.com"
              name="email"
              onChange={onChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
              required
            />
            <button type="submit">Register</button>
            <p style={{marginLeft:"240px",fontSize:"19px"}}>Already an User?<NavLink to="/login" style={{color:"grey"}}>Login</NavLink></p>
          </form>
        </div>
        </div>
      
    </>
  );
}
