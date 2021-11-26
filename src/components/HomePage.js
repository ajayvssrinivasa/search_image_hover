import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { Container,Navbar,Nav,Card,Row,Col,Form} from 'react-bootstrap'
export default function HomePage() {
    let [products,setProducts]=useState([]);
    let [item,setItem]=useState('')
    useEffect(()=>{
        let url=" http://localhost:3001/Products";
        axios.get(url)
        .then(res=>{
            const search_res = res.data.filter(itm=>
                itm.pname.toLowerCase().includes(item));
                console.log(search_res);
            setProducts(search_res)
        })
    },[item]);
    const alldata=async()=>{
        const item=await axios.get("http://localhost:3001/Products");
        setProducts(item.data)
    }
    const cakedata=async()=>{
        const item=await axios.get("http://localhost:3001/Products");
        const cake=item.data.filter(itm=>itm.category==='cake')
        setProducts(cake)
    }
    const biscuitsdata=async()=>{
        const item=await axios.get("http://localhost:3001/Products");
        const biscuits=item.data.filter(itm=>itm.category==='biscuits')
        setProducts(biscuits)
    }
    const cookiesdata=async()=>{
        const item=await axios.get("http://localhost:3001/Products");
        const cookies=item.data.filter(itm=>itm.category==='cookies')
        setProducts(cookies)
    }
    const doughnutsdata=async()=>{
        const item=await axios.get("http://localhost:3001/Products");
        const doughnuts=item.data.filter(itm=>itm.category==='doughnuts')
        setProducts(doughnuts)
    }
    const handleHover = (event, img) =>{
        function* getImage() {
            for (let image of img) {
              yield image;
            }
          }
    const imageGenerator = getImage();
          function showNextImage() {
            const image = imageGenerator.next().value;
            if (!image) return;
            event.target.src = `/images/${image}`;
            setInterval(showNextImage, 1000);
          };
          showNextImage();
    }
    const hoverOut = (event, img) =>{
        event.target.src=`/images/${img[0]}`;
    }
    return (
        <Container style={{backgroundColor:"wheat"}}>
            <h2 className="text-center" style={{color:"red"}}>Our Store</h2>
        <Navbar bg="dark" expand="lg">
  <Container>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" style={{marginLeft:400}}>
        <Nav.Link className="text-white" style={{marginLeft:40}} onClick={alldata}>All</Nav.Link>
        <Nav.Link className="text-white" style={{marginLeft:40}} onClick={cakedata}>Cakes</Nav.Link>
        <Nav.Link className="text-white" style={{marginLeft:40}} onClick={biscuitsdata}>Biscuits</Nav.Link>
        <Nav.Link className="text-white" style={{marginLeft:40}} onClick={cookiesdata}>Cookies</Nav.Link>
        <Nav.Link className="text-white" style={{marginLeft:40}} onClick={doughnutsdata}>Doughnuts</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Form>
<Form.Group className="m-5 d-flex justify-content-center" >
<Form.Control type="text" placeholder="Enter Product name" value={item} 
onChange={(e)=>{setItem(e.target.value)}} style={{width:500}} />
 </Form.Group></Form>
<Container className="mt-3">
{products.length ===0 ? <h3>No data found</h3>:
<Row>
    {products.map(item=>
    <Col lg={4}>
<Card className="m-2">
    
    <Card.Img variant="top" src={`/images/${item.images[0]}`} style={{height:200}} 
  onMouseOver={(e)=>{handleHover(e, item.images)}} onMouseLeave={(e)=>{hoverOut(e, item.images)}}/>
  
  <Card.Body className="d-flex justify-content-between">
    <Card.Title>{item.pname}</Card.Title>
    <Card.Text>
     ${item.price}
    </Card.Text>
  </Card.Body>
</Card>
</Col>
)}
</Row>}
</Container>
</Container>
    )
}
