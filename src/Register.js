import React, { useState } from 'react'
import axios from "axios";
import "./Register.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Register = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] =useState("");
    const [Contact,setContact] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [date,setDate] = useState("");

    const handlefirstname = (event) => {
        setFirstname(event.target.value);
    };
    const handlelastname = (event) => {
        setLastname(event.target.value);
    };
    const handleusername = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleRole = (event) => {
        setRole(event.target.value);
    }
    const handleDepartment = (event) => {
        setDepartment(event.target.value);
    }
    const handleaddress = (event) => {
        setAddress(event.target.value);
    }
    const handlecontact = (event) => {
        setContact(event.target.value);
    }
    const handleDate =(event) => {
        setDate(event.value);
        console.log(event);
    }
    const handleSignUp = (e) => {
        //used to prevent reload of page on submit
        e.preventDefault();

        const data = {
            UserName: username,
            Password: password,
            Role: role
        }
        console.log(data);
        const url = "https://localhost:44313/api/test/Login";
        axios.post(url, data).then((result) => {
            alert(result.data);
            if (result.data === "Login Successful") {
                alert(result.data);
                // if (role === "Admin") {
                //     navigate("/Admin");
                // }
                // else if (role === "User") {
                //     navigate("/User");
                // }
                navigate("/");
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
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <div className='heading'>First Name</div>
                    <input className="textbox" type="text" placeholder='First Name' onChange={handlefirstname}/>
                </div>

                <div className='input'>
                    <div className='heading'>Last Name</div>
                    <input className="textbox" type="text" placeholder='Last Name' onChange={handlelastname}/>
                </div>

                <div className='input'>
                    <div className='heading'>Username</div>
                    <input className="textbox" type="email" placeholder='Username' onChange={handleusername}/>
                </div>

                <div className='input'>
                    <div className='heading'>Password</div>
                    <input className="textbox" type="password" placeholder='Password' onChange={handlePasswordChange}/>
                </div>

                <div className='input'>
                    <div className='heading'>Confirm Password</div>
                    <input className="textbox" type="password" placeholder='Confirm Password' />
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
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"User"}>User</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className='input'>
                    <div className='heading'>Select Date of Joining</div>
                    <div className='drop-box-dob'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker slotProps={{ textField: { size: 'small' } }} onChange={handleDate}/>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='input'>
                    <div className='heading'>Select Department</div>
                    <div className='drop-box-deparment'>
                        <FormControl className="formcontrol" sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Department</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={department}
                                label="Department"
                                onChange={handleDepartment}
                            >
                                <MenuItem value={"Engineering"}>Engineering</MenuItem>
                                <MenuItem value={"Human Resource"}>Human Resource</MenuItem>
                                <MenuItem value={"Finance"}>Finance</MenuItem>
                                <MenuItem value={"IT"}>IT</MenuItem>
                                <MenuItem value={"Customer Support"}>Customer Support</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                </div>



                <div className='input'>
                    <div className='heading'>Enter Address</div>
                    <input className="textbox" type="text" placeholder='Address' onChange={handleaddress}/>
                </div>

                <div className='input'>
                    <div className='heading'>Contact</div>
                    <input className="textbox" type="text" placeholder='Contact' onChange={handlecontact}/>
                </div>




                {/* <div className='forgot-password'>Lost Password? <span>Click Here!</span></div> */}
                <div className='submit-container'>
                    <div className='submit' onClick={handleSignUp}>Sign Up</div>
                    {/* <div className='submit'>Login</div> */}
                </div>
            </div>
        </div>
    )
}

export default Register