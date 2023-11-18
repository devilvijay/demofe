import React, { useState } from 'react'
import axios from "axios";
import "./Login.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('');
   

    const handleRole = (event) => {
        setRole(event.target.value);
    };
    const handleusername = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        navigate("/Register");
    }
    const handleLogin = (e) => {
        //used to prevent reload of page on submit
        e.preventDefault();

        const data = {
            UserName: username,
            Password: password,
            Role: role
        }
        console.log(data);
        const url = "https://localhost:44372/Login";
        axios.post(url, data).then((result) => {
            alert(result.data);
            if (result.data === "Login Successful") {
                alert(result.data);
                if (role === "Admin") {
                    navigate("/Admin");
                }
                else if (role === "User") {
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
        <div className='container'>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <div className='heading'>Username</div>
                    <input className="textbox" type="email" placeholder='Username' onChange={handleusername}/>
                </div>

                <div className='input'>
                    <div className='heading'>Password</div>
                    <input className="textbox" type="password" placeholder='Password' onChange={handlePasswordChange}/>
                </div>

                <div className='input'>
                    <div className='heading'>Select Role</div>
                    <div className='drop-box-role'>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={role}
                                label="Role"
                                onChange={handleRole}
                            >
                                <MenuItem value={'Admin'}>Admin</MenuItem>
                                <MenuItem value={'User'}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='forgot-password'>New User? <span onClick={handleSignUp}>Click Here to Register!</span></div>
                <div className='submit-container'>
                    <div className='submit' onClick={handleSignUp}>Sign Up</div>
                    <div className='submit' onClick={handleLogin}>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Login