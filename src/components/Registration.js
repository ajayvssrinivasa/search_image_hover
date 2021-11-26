import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Container,Form,Button,Row,Col,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const regusername=RegExp(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/);
const regemail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regpassword=RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
export default function Registration() {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(0);
    const [cpassword,setCpassword]=useState(0);
    const [register,setRegister]=useState([])
    const navigate=useNavigate();
    const handlesubmit=()=>{
        let data={username:username,email:email,password:password};
        let Url=" http://localhost:3001/Users"
        axios.post(Url,data)
        .then(res=>{
            setRegister(res.data);
            alert("Register successfull")
            navigate('/login')
        })
    }
    const handle=()=>{
        navigate("/login")
    }
    return (
        <Container>
            <h2 className="text-center">Registeration</h2>
            <Form>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Username
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Enter username" name="username" onChange={(e)=>{setUsername(e.target.value)}} />
                    {username!= ''  && !regusername.test(username) && <Alert variant="danger">
                               username must be more than 4 charcter
                            </Alert>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Enter Email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
                    {email!='' && !regemail.test(email)&&<Alert variant="danger">
                               Enter valid Email id
                            </Alert>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {password!=0 && !regpassword.test(password)&&<Alert variant="danger">
                               Enter valid Password
                            </Alert>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Confirm Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="password" placeholder=" Enter Confirm Password"  name="cpassowrd" onChange={(e)=>{setCpassword(e.target.value)}}/>
                    {cpassword===password? '':<Alert variant="danger">
                               Password Doesnt match
                            </Alert>}
                    </Col>
                </Form.Group>
                <Button variant="primary" onClick={handlesubmit}>Register</Button>
                <Button variant="primary" onClick={handle}>Login</Button>
                </Form>
        </Container>
    )
}
