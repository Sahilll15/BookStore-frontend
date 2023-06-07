import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useToast ,ToastProvider,Box} from "@chakra-ui/react";
import Logo from './logo.png'

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://bookstore-ksae.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
          formData
          ),
        }
      );
      const json =  await response.json();
    
      if(response.ok){
        console.log(json);
        console.log(json.user.role);
        console.log(json.user.name)
        if(json.user.role ==="superuser"){
            localStorage.setItem("super-secret-key", json.token);
        }
        localStorage.setItem("secret-key", json.token);
        localStorage.setItem("user_id", json.user._id);
        localStorage.setItem("user_name", json.user.name);
        toast({
          title: "Login Success",
          description: "You are successfully logged in",
          status: "success",
          duration: 3000,
          position:"top",
          isClosable: true,
        });
        navigate("/");
      }else{
        toast({
          title: "Login Failed",
          description: "Please check your credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
   
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    console.log(formData);
  };
  return (
    <>


      <div className="login-container">
     
        <div className="login-form">
        <img style={{width:"25%",height:"340px",marginBottom:"100px"}} src={Logo} alt="Error" className="error-image" />
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login </button>
            <p style={{marginLeft:"150px",fontSize:"19px"}}>Not an User?<NavLink to="/register" style={{color:"grey"}}>Register</NavLink></p>
          </form>
        </div>
        </div>
    </>

  );
}
