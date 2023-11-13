import React, { Fragment, useState } from 'react'
import axios from "axios";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { useHistory } from 'react-router-dom';
import Admin from './Admin';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";



const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleNameChange = (value) =>
    {
        setUsername(value);
    }
    const handlePasswordChange = (value) =>
    {
        setPassword(value);
    }
    
    const setSelectedFruit = (value) =>
    {
        setRole(value);
    }
    const handleLogin = () => {
        // e.preventdefault();

        const data = {
            UserName:username,
            Password:password,
            Role:role
        }
        console.log(data);
        const url = "https://localhost:44313/api/test/Login";
        axios.post(url, data).then((result) => {
            alert(result.data);
            // navigate("/Admin");
            // e.preventdefault();
            // if (result.data === "Login Successful")
            // {
            //     alert(result.data);
            //     navigate("/Admin");
            // } else {
            //     alert(result.data);
            //     navigate("/");
            //     }
        }).catch((error) => {
            alert(error);
            // navigate("/Admin");
        })
        
        // e.preventdefault();
        if (role ==="Admin") {
            navigate("/Admin");
        }
        if(role==="User")
        {
            navigate("/User");
        }

    }


  return (
      <Fragment classname='body_f'>
          <div id="card" >
            <div id="card-content">
               <div id="card-title"><h2>LOGIN</h2>
                   <div class="underline-title"></div>
               </div>
                  <form class="form" >
                  <label  style={{paddingTop:'13px'}}>&nbsp;Select Role</label>
                      <select class="form-content" required onChange={e => setSelectedFruit(e.target.value)}>
                          <option>Admin</option>
                          <option>User</option>
                      </select>
               <div class="form-border"></div>
               <label style={{paddingTop:'13px'}}>&nbsp;Username</label>
               <input id="user-email" class="form-content"  required onChange={(e)=>handleNameChange(e.target.value)}/>
               <div class="form-border"></div>
               <label style={{paddingTop:'22px'}}>&nbsp;Password</label>
               <input id="user-password" class="form-content"  required onChange={(e)=>handlePasswordChange(e.target.value)}/>
               <div class="form-border"></div>
                      <button id="submit-btn"  onClick={handleLogin}>Submit</button> 
                      {/* <input id="submit-btn" type="submit" name="submit" value="LOGIN" /> */}
      </form>
              </div>
              
  </div>
         
          
    </Fragment>
  )
}

export default Login