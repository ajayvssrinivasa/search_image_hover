import axios from 'axios';
import React,{useState} from 'react';
import { Container,Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router';

const regemail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
const regpassword=RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
export default function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(0);
    const navigate=useNavigate();
  
    const handlesubmit=async()=>{
        let data={email:email,password:password}
        let url=" http://localhost:3001/Users"
        const res=await axios.get(url);
        const reg=res.data.filter(x=>x.email===email && x.password === password);
        console.log(reg);
        if(reg.length !== 0 && reg !== undefined){
            alert("Login successfull")
            navigate('/homepage')
        }else{
            alert("Incorrect Login")
        }
    }
    const handle=()=>{
        navigate('/')
    }
    return (
        <Container>
            <h2 className="text-center">Login </h2>
            <Form>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Email
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" placeholder="Enter Email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
                    {email!='' && !regemail.test(email) && <Alert variant="danger">
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
                    {password!=0 && !regpassword.test(password)  && <Alert variant="danger">
                               Enter valid Password
                            </Alert>}
                    </Col>
                </Form.Group>
               
                <Button variant="primary" onClick={handlesubmit}>Login</Button>
                <Button variant="primary" onClick={handle}>Register</Button>
                </Form>
        </Container>
    )
}
