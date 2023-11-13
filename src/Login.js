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
    const handleLogin = (e) => {
        //used to prevent reload of page on submit
        e.preventDefault();

        const data = {
            UserName:username,
            Password:password,
            Role:role
        }
        console.log(data);
        const url = "https://localhost:44313/api/test/Login";
        axios.post(url, data).then((result) => {
            alert(result.data);
            if (result.data === "Login Successful")
            {
                alert(result.data);
                if (role ==="Admin") {
                    navigate("/Admin");
                }
                else if(role === "User")
                {
                    navigate("/User");
                }
            } else {
                alert(result.data);
                navigate("/");
            }
        }).catch((error) => {
            alert(error);
            navigate("/");
        })
    
    }


  return (
      <Fragment classname='body_f'>
          <div id="card" >
            <div id="card-content">
               <div id="card-title"><h2>LOGIN</h2>
                   <div class="underline-title"></div>
               </div>
                  <form class="form" onSubmit={handleLogin}>
                  <label  class="form_row">&nbsp;Select Role</label>
                      <select class="form-content" required onChange={(e) => setSelectedFruit(e.target.value)}>
                          <option>None</option>
                          <option>Admin</option>
                          <option>User</option>
                      </select>
               <div class="form-border"></div>
               <label class="form_row">&nbsp;Username</label>
               <input id="user-email" class="form-content"  required onChange={(e)=>handleNameChange(e.target.value)}/>
               <div class="form-border"></div>
               <label class="form_row">&nbsp;Password</label>
               <input id="user-password" class="form-content" type="password" required onChange={(e)=>handlePasswordChange(e.target.value)}/>
               <div class="form-border"></div>
                      <button id="submit-btn">Submit</button> 
                      {/* <input id="submit-btn" type="submit" name="submit" value="LOGIN" /> */}
      </form>
              </div>
              
  </div>
         
          
    </Fragment>
  )
}

export default Login