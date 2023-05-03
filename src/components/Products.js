import '../App.css';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Offcanvas, Carousel, Stack, Form } from 'react-bootstrap';
import { BiSearch, BiChevronDown } from "react-icons/bi";
import { CiUser } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineBars } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { VscThreeBars } from "react-icons/vsc";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineLocalOffer } from "react-icons/md";
let singlecat;

function Product() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categary, setcategary] = useState(false);
  const [menu, setmenu] = useState(true);
  let [val, setval] = useState([])
  let [status, setstatus] = useState(false)
  let [catstatus, setCatstatus] = useState(false)
  let [cat, setCat] = useState([])
  // const [apiData, setApiData] = useState([]);
  // const params = useParams();
  const searchHandler = (e) =>
  {
    e.preventDefault();
    let elm = e.target.search.value;
    console.log(elm);
    // setCatstatus(true);
    singlecat = elm;
    axios.get(`https://dummyjson.com/products/category/${singlecat}`)
    .then(response => {
      console.log(response.data.products);
      let arr_length = (response.data.products.length)
      if(arr_length==0)
      {
       alert("Sorry!.....Data Not Found")
      }
      setval(response.data.products);
      setstatus(true);
    })
    .catch(error => {
      console.log(error);
    });

  }
  const handleClick = () => {
    setmenu(!menu);
    setcategary(!categary);
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
    // alert("click")
     setCatstatus(true);
     singlecat = data1;
     alert(singlecat)
  };

  useEffect(() => {
    if(catstatus) {
        alert(singlecat);
        
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

    }
    else {
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
    }
  },[catstatus])



  if (status) {
    return (
      <>
        <div className='header'>
          <Container fluid>
            <Stack direction="horizontal" gap={3}>
              <div className="header_left">
                <p className="welcome-msg">Welcome to Wolmart Store message or remove it!</p>
              </div>
              <div className="header_right d-flex ms-auto">
                <div className='drowp1'>
                  <Form.Select aria-label="Default select example p-0 m-0">
                    <option>USD</option>
                    <option value="2">EUR</option>
                  </Form.Select>
                </div>
                <div className='drowp2'>
                  <Form.Select aria-label="Default select example">
                    <option>ENG</option>
                    <option value="2">FRA</option>
                  </Form.Select>
                </div>
                <div className="vr  d-lg-show" />
                <ul className='manu d-none d-lg-flex block d-flex align-items-center p-0 ms-0'>
                  <li><a href='/'>Blog</a></li>
                  <li><a href='/'>Contact Us</a></li>
                  <li><a href='/'>My Account</a></li>
                  <li><a href='/'><CiUser className='user_icon' />Sign In / Register</a></li>
                </ul>
              </div>
            </Stack>
          </Container>


        </div>
        <div className='header-middle'>
          <Container fluid>
            <div className='navbar d-flex align-items-center'>
              <div className='navbottom_left d-flex'>
                <button className='nav_btn1 d-block d-md-none mt-0' onClick={handleShow}>
                  <VscThreeBars className='bar_icon1' />
                </button>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
              <div className='nav_left d-flex align-items-center'>
                <a href='/'><img src={require('../images/logo.png')} alt="" className='me-3' width='144px' height='45px' /></a>
                <form method="get" onSubmit={searchHandler} className="header-search hs-expanded hs-round d-none d-md-flex input-wrapper mt-0 mb-0">
                  <div className="select-box">
                    <select id="category" name="category">
                    </select>
                  </div>
                  <input type="text" className="form-control" name="search" id="search" placeholder="Search in..." required="" />
                  <button className="btn btn-search" type="submit" ><BiSearch className='search_icon' /></button>
                </form>
              </div>
              <div className='nav_right d-flex'>
                <div className="header-call wish d-lg-block d-lg-flex align-items-center">
                  <a href="/"><IoCallOutline className='icon_call' /></a>
                  <div className="call-info d-xl-block d-none">
                    <h4 className="chat mb-0">
                      <a href="/">Live Chat</a> or :</h4>
                    <a href="/" className="phone-number">0(800)123-456</a>
                  </div>
                </div>
                <a className="wishlist label-down wish d-lg-block" href="wishlist.html">
                  <AiOutlineHeart className='nav_icon' /><br />
                  <span className="wishlist-label d-xl-block d-none">Wishlist</span>
                </a>
                <a className="wishlist label-down link1 d-xs-show" href="wishlist.html">
                  <BsCart className='nav_icon' /><br />
                  <span className='cartn' bg="primary">9</span>
                  <span className="wishlist-label d-xl-block d-none">Cart</span>
                </a>
              </div>
            </div>
          </Container>
        </div>
        <div className='header-bottom d-none  d-md-block'>
          <Container fluid>
            <div className='navbar py-0 d-flex align-items-center'>
              <div className='navbottom_left d-flex'>
                <button className='nav_btn btn-off mt-0' onClick={handleShow}>
                  <AiOutlineBars className='bar_icon' />Browse Categories
                </button>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>   <form action="#" method="get" className="input-wrapper">
                      <input type="text" className="form-control1" name="search" autoComplete="off" placeholder="Search" required="" />
                      <button className="btn btn-search1" type="submit"><BiSearch className='search_icon icon_color' /></button>
                    </form>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className='p-0'>
                    <div>
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <button className="nav-link active" onClick={handleClick}>Main Menu</button>
                        </li>
                        <li className="nav-item">
                          <button className="nav-link" onClick={handleClick}>Categories</button>
                        </li>
                      </ul>
                    </div>
                    {menu &&
                      <div className='menu_area'>
                        <ul className="menu_off active-underline align-items-center pt-2 d-block p-0 m-0 ">
                          <li>
                            <a href="demo1.html">Home</a>
                          </li>
                          <li>
                            <a href="shop-banner-sidebar.html">Shop<BiChevronDown className='nav_down_icon' /></a>
                          </li>
                          <li>
                            <a href="vendor-dokan-store.html">Vendor <BiChevronDown className='nav_down_icon' /></a>
                          </li>
                          <li>
                            <a href="blog.html">Blog <BiChevronDown className='nav_down_icon' /></a>
                          </li>
                          <li className="active has-submenu">
                            <a href="about-us.html">Pages <BiChevronDown className='nav_down_icon' /></a>
                          </li>
                          <li>
                            <a href="elements.html">Elements <BiChevronDown className='nav_down_icon' /></a>
                          </li>
                        </ul>
                      </div>
                    }
                    {categary &&
                      <div className='categary_area'>
                        <ul className="menu_off active-underline align-items-center pt-2 d-block p-0 m-0 ">
                          {
                            cat.map((data, index) => {
                              return (
                                <li key={index}>
                                  {/* <a  href={`/product/${data}`} onClick={(e) => handleApiRequest(data)} className='cat_a'>{data}</a> */}
                                  <button onClick={(e) => handleApiRequest(data)} className='cat_a'>{data}</button>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    }
                  </Offcanvas.Body>
                </Offcanvas>

                <nav className='main-nav d-none d-xl-block'>
                  <ul className="menu active-underline align-items-center pt-2  d-flex ">
                    <li>
                      <a href="demo1.html">Home</a>
                    </li>
                    <li>
                      <a href="shop-banner-sidebar.html">Shop<BiChevronDown className='nav_down_icon' /></a>
                    </li>
                    <li>
                      <a href="vendor-dokan-store.html">Vendor <BiChevronDown className='nav_down_icon' /></a>
                    </li>
                    <li>
                      <a href="blog.html">Blog <BiChevronDown className='nav_down_icon' /></a>
                    </li>
                    <li className="active has-submenu">
                      <a href="about-us.html">Pages <BiChevronDown className='nav_down_icon' /></a>
                    </li>
                    <li>
                      <a href="elements.html">Elements <BiChevronDown className='nav_down_icon' /></a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className='nav_right d-flex'>
                <a href="/" className="d-xl-show navfirst"><SlLocationPin className='right_icon pe-1' />Track Order</a>
                <a href="/"><MdOutlineLocalOffer className='right_icon pe-1' />Daily Deals</a>
              </div>
            </div>
          </Container>


        </div>
        <div className='slider'>
          <Carousel >
            <Carousel.Item >
              <img
                className="d-block w-50 slider_img"
                src={require('../images/asset 10.png')}
                alt="First slide" align='right'
              />
              <Carousel.Caption>
                <h4 className="banner-subtitle font-weight-bold">Accessories Collection</h4>
                <h2 className="banner-title text-white text-uppercase font-weight-bolder ls-10">Smart Watches</h2>
                <a href="shop-banner-sidebar.html" className="btn btn-light btn-rounded btn-icon-right">Discover Now</a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
              <img
                className="d-block w-50 slider_img"
                src={require('../images/asset 11.png')}
                alt="First slide" align='right'
              />
              <Carousel.Caption>
                <h4 className="banner-subtitle font-weight-bold">Accessories Collection</h4>
                <h2 className="banner-title text-white text-uppercase font-weight-bolder ls-10">Smart Watches</h2>
                <a href="shop-banner-sidebar.html" className="btn btn-light btn-rounded btn-icon-right">Discover
                  Now<i className="w-icon-long-arrow-right"></i></a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item >
              <img
                className="d-block w-50 slider_img"
                src={require('../images/asset 12.png')}
                alt="First slide" align='right'
              />
              <Carousel.Caption>
                <h4 className="banner-subtitle font-weight-bold">Accessories Collection</h4>
                <h2 className="banner-title text-white text-uppercase font-weight-bolder ls-10">Smart Watches</h2>
                <a href="shop-banner-sidebar.html" className="btn btn-light btn-rounded btn-icon-right">Discover
                  Now<i className="w-icon-long-arrow-right"></i></a>
              </Carousel.Caption>
            </Carousel.Item>

          </Carousel>
        </div>
        <div className="App product_area">
          <section className='main_area'>
            <Container fluid>
              <Row>
                <Col xs={12}>
                  <h2 className="title justify-content-center mb-4 mt-10 pt-1 ">Popular Departments</h2>
                </Col>
                <Col xs={12}>
                  <div className='d-flex justify-content-center mb-3'>
                    <Button variant="outline-secondary mx-1 mb-2">New arrivals</Button>
                    <Button variant="outline-secondary mx-1 mb-2">Best seller</Button>
                    <Button variant="outline-secondary mx-1 mb-2">most popular</Button>
                    <Button variant="outline-secondary mx-1 mb-2">Featured</Button>
                  </div>
                </Col>
              </Row>
              <Row>
                {
                    val.map((data, index) => {
                      return (
                        // <Singleproduct name={data.id}/>
                        <Card style={{ width: '235px' }} key={index}>
                          {/* <a href="/single"><Card.Img variant="top" src={data.thumbnail} className='img-fluid' /></a> */}
                          <a href={`/product/${data.id}`}><Card.Img variant="top" src={data.thumbnail} className='img-fluid' /></a>
                          <Card.Body>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Title>
                              {data.rating} {' (Rating) '}
                            </Card.Title>
                            <Card.Title className='rate'>{'$'}{data.price}</Card.Title>
                          </Card.Body>
                        </Card>
                      )
                    })
               }
              </Row>
  
            </Container>
          </section>
        </div>
      </>
    );
  }
  else {
    return (
      <>
        <div className="loader"></div>
      </>
    )
  }

}
export default Product;
