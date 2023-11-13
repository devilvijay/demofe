import React, {useState,useEffect, Fragment} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';

const Admin = () => {
  const [data, setData] = useState([]);
  const [userdata, setUserData] = useState([]);

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
  const empdata = [
    {
      Emp_ID:101,
      Firstname:"Rinku",
      LastName:"Gabhane",
      Department:"Engineering"
    },
    {
      Emp_ID:102,
      Firstname:"Rutuja",
      LastName:"Gabhane",
      Department:"Finance"
    },
    {
      Emp_ID:103,
      Firstname:"hudhud",
      LastName:"Gabhane",
      Department:"HR"
    }
  ]

  const getuserdata = (id) => {
       axios.get(`https://localhost:44313/api/test/User/${id}`)
      .then((result) => {
        setUserData(result.data);
      }).catch((error) => {
        console.log(error);
    })
    
  }

  const getData = () => {
    const url = "https://localhost:44313/api/test/Admin";
    axios.get(url)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
    })
  }

  useEffect(() => {
    getData();
  },[])

  const handleEdit=(id)=>
  {
    // alert(id);
    handleShow();
    // console.log(id);
    axios.get(`https://localhost:44313/api/test/User/${id}`)
      .then((result) => {
        console.log(result.data);
        // console.log(result.data.Emp_ID);
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

  const handleDelete=(id)=>
  {
    if (window.confirm("Are you sure to delete this employee?") == true)
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
      "Contact": contact

    }
    console.log(data);
    axios.put(url, data)
      .then((result) => {
        console.log(result.data)
        getData();
        clear();
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
          {
                data && data.length > 0 ?
                data.map((item, index) => {
                  return (
                    <tr key={index} style={{
                      backgroundColor: 'green'
                  }}>
                      <td>{index + 1}</td>
                      <td>{item.Emp_ID}</td>
                      <td>{item.Firstname}</td>
                      <td>{item.LastName}</td>
                      <td>{item.Department}</td>
                      <td colSpan={2}>
                        <button className='btn btn-primary' onClick={() => handleEdit(item.Reg_ID)}>Edit</button>&nbsp;
                        <button className='btn btn-danger' onClick={() => handleDelete(item.Emp_ID)}>Delete</button>
                      </td>
                    </tr>
                  )
                }) :
                'Loading...'
             
          }
        
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

export default Admin