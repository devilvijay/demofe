import React, {useState,useEffect, Fragment,useRef} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = ({regid}) => {
  // const id = 2;
  // const [data, setData] = useState([]);
  const [userdata, setUserData] = useState({});

  //modal pop up
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //edit name
  const [emp_id, setEmp_id] = useState();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [reg_ID, setReg_ID] = useState();
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [dateofjoining, setDateofjoining] = useState();
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  //creating a dummy data
  

  const getuserdata = (regid) => {
       axios.get(`https://localhost:44313/api/test/User/${regid}`)
         .then((result) => {
           console.log(result.data);
        setUserData(result.data);
      }).catch((error) => {
        console.log(error);
    })
  }
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getuserdata(regid);
    }
  },[{}])

  //handle edit
  const handleEdit = (id) =>
  {
    // alert(id);
    handleShow();
    // console.log(id);
    axios.get(`https://localhost:44313/api/test/User/${id}`)
      .then((result) => {
        console.log(result.data);
        console.log(result.data.Emp_ID);
        setEmp_id(result.data.Emp_ID)
        setFirstname(result.data.Firstname);
        setLastname(result.data.LastName);
        setDepartment(result.data.Department);
        setReg_ID(result.data.Reg_ID);
        setDateofjoining(result.data.DateOfJoining);
        setRole(result.data.Role);
        setAddress(result.data.Address);
        setContact(result.data.Contact);

        // setFirstname(result.data.Firstname);

      }).catch((error) => {
        console.log(error);
    })
  }
   
  //handle delete
  const handleDelete=(id)=>
  {
    if (window.confirm("Are you sure to delete this employee?") === true)
    {
      const url = `https://localhost:44313/api/test/Delete/${id}`;
      axios.delete(url)
        .then((result) => {
          toast.success("User is deleted!");
        }).catch((error)=>
      {
        toast.error(error);
      })
    }
  }
  
  //handle update
  const handleUpdate = (id) =>
  {
    const url = `https://localhost:44313/api/test/Update/${id}`;
    const data = {
      "Emp_ID":id,
      "Firstname": firstname,
      "Lastname": lastname,
      "Department": department,
      "Reg_ID": reg_ID,
      "Role": role,
      "DateOfJoining": dateofjoining,
      "Address": address,
      "Contact": contact,
      // "Registration": null
    }
    console.log(data);
    axios.put(url, data)
      .then((result,res) => {
        console.log(result.data)
        console.log(res);
        getuserdata(reg_ID);
        // clear();
        handleEdit(reg_ID);
        toast.success("employee has been updated");

      })
      .catch((error)=>
      {
        console.log(error);
      })
  }

  const clear = () => {
    setFirstname('');
    setLastname('');
    setDepartment('');
    setAddress('');

  }

  return (
    <Fragment>
      <ToastContainer/>
      <br></br>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Emp_ID</th>
          <th>Firstname</th>
          <th>LastName</th>
          <th>Department</th>
          <th>Actions</th>   
            
        </tr>
      </thead>
        <tbody>
          <tr  >
            <td> 1</td>
            <td>{userdata.Emp_ID}</td>
            <td>{userdata.Firstname}</td>
            <td>{userdata.LastName}</td>
            <td>{userdata.Department}</td>
            <td colSpan={2}>
              <button className='btn btn-primary' onClick={() => handleEdit(userdata.Reg_ID)}>Edit</button>&nbsp;
              <button className='btn btn-danger' onClick={() => handleDelete(userdata.Emp_ID)}>Delete</button>
            </td>
          </tr>                
      </tbody>
      </Table>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title >Modify / Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Row >
          <Row >
          <Col >
              <label> Emp_ID</label>
            </Col>
            <Col >
              <input type='number' className='form-control' placeholder='EMp_ID' value={emp_id} readOnly></input>
              </Col>
          </Row>
          <Row >
            <Col>
              <label> FirstName</label>
            </Col>
            <Col>
              <input type='text'className='form-control'placeholder='enter FirstName'value={firstname} onChange={(e)=>setFirstname(e.target.value)}></input>
              </Col>
          </Row>
          <Row >
            <Col>
              <label>LastName</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='enter LastName' value={lastname} onChange={(e)=>setLastname(e.target.value)}></input>
              </Col>
          </Row>
          <Row >
            <Col>
              <label>Reg_ID</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='Reg_ID'value={reg_ID} onChange={(e)=>setReg_ID(e.target.value)}></input>
              </Col>
            </Row>     
            <Row >
            <Col>
              <label>Department</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='enter Department'value={department} onChange={(e)=>setDepartment(e.target.value)}></input>
              </Col>
            </Row>     
            <Row >
            <Col>
              <label>Role</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='Role'value={role} onChange={(e)=>setRole(e.target.value)}></input>
              </Col>
            </Row>
            <Row >
            <Col>
              <label> DateOfJoining</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='Date'value={dateofjoining} onChange={(e)=>setDateofjoining(e.target.value)}></input>
              </Col>
            </Row>      
            <Row >
            <Col>
              <label> Address</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='Address'value={address} onChange={(e)=>setAddress(e.target.value)}></input>
              </Col>
            </Row>
            <Row >
            <Col>
              <label>Contact</label>
            </Col>
            <Col>
            <input type='text'className='form-control'placeholder='Contact'value={contact} onChange={(e)=>setContact(e.target.value)}></input>
              </Col>
          </Row>        
      </Row>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdate(emp_id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal> 
    </Fragment>
  )
}

export default User