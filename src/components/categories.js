import { Button, Offcanvas, Navbar, Nav, Form, Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BsList, BsCurrencyDollar } from "react-icons/bs";
import { TbDiscountCheck } from "react-icons/tb";
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


let singlecat

function Categories() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [val, setval] = useState([]);
  let [status, setstatus] = useState(false);
  // let [catstatus, setCatstatus] = useState(false)
  let [cat, setCat] = useState([])



  const searchHandler = (e) => {

    e.preventDefault();
    let elm = e.target.search.value;
    singlecat = elm;
    axios.get(`https://dummyjson.com/products/search?q=${singlecat}`)
      .then(response => {
        console.log(response.data.products);
        let arr_length = (response.data.products.length)
        if (arr_length == 0) {
          alert("Sorry!.....Product Not Found")
        }
        setval(response.data.products);
        setstatus(true);
      })
      .catch(error => {
        console.log(error);
      });

  }

  const handleClick = () => {
    // setmenu(!menu);

    // setcategary(!categary);
    axios.get('https://dummyjson.com/products/categories')
      .then(function (response) {
        // console.log(response.data);
        setCat(response.data)
        setstatus(true)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const handleApiRequest = (data1) => {
    // setCatstatus(true);
    // setCatstatus(current => !current)
    
    singlecat = data1;
    axios.get(`https://dummyjson.com/products/category/${singlecat}`)
      .then(response => {
        console.log(response.data.products);
        setval(response.data.products);
        setstatus(true)
        // setCatstatus(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    // if (catstatus) {
    // }
    // else {
    axios.get('https://dummyjson.com/products')
      .then(function (response) {
        // handle success
        console.log(response.data.products);
        setval(response.data.products)
        setstatus(true)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    // }
  }, [])



  if (status) {
    return (
      <>
        {/* header start */}
        <Navbar bg="light" expand="lg" className='p-3'>
          <Container>
            <>
              <Button variant="light" className='me-4' onClick={handleShow}>
                <BsList onClick={handleClick}></BsList>
              </Button>
              <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Categories</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div>
                    {
                      cat.map((data, index) => {
                        return (
                          <>
                            <ul>
                              <li key={index}>
                                <button onClick={(e) => handleApiRequest(data)}>
                                  {data}
                                </button>
                              </li>
                            </ul>
                          </>
                        )
                      })
                    }
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </>

            <Navbar.Brand>
              <img src={require('../images/flipkart.png')} className='img-fluid'></img>
            </Navbar.Brand>
            <a href='/'>Home</a>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="m-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
              <Form className="set-width d-flex " onSubmit={searchHandler}>
                <Form.Control
                  type="search"
                  placeholder="Search your preferred items here"
                  className="me-2"
                  aria-label="Search"
                  id="search"
                />
                <Button variant="dark" type='submit'>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* header over */}
        {/* product section start */}

        <Container>
          <div className="img wrapper">
            {
              val.map((data, index) => {
                return (
                  <>
                    <Card style={{ width: '15rem' }} key={index}>
                      <a href={`products/${data.id}`}>
                        <Card.Img variant="top" src={data.thumbnail} className=" img-fluid" />
                      </a>
                      <Card.Body>
                        <Card.Title>{data.title}</Card.Title>
                        <Card.Text>
                          {data.brand}
                        </Card.Text>
                        <Card.Text className='p-0'>
                          <BsCurrencyDollar className='icon_bs'></BsCurrencyDollar>{data.price}-<TbDiscountCheck className='icon_bs'></TbDiscountCheck>{data.price}
                        </Card.Text>
                        <Card.Text>
                          Stock: {data.stock}
                        </Card.Text>
                        <Card.Text>
                          {data.category}
                        </Card.Text>

                      </Card.Body>
                    </Card>

                  </>
                )
              })}
          </div>
        </Container>
        {/* product section over */}
      </>
    )
  } else {
    return (

      <>
        <div className='loader'>
        </div>
      </>
    )
  }

}

export default Categories