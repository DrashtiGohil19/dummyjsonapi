import '../App.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';


function Singleproduct() {
  let [val, setval] = useState([])
  let [status, setstatus] = useState(false)
  
  const [showImage, setShowImage] = useState();
  const Arr = val.images;

  const params = useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${params.id}`)
      .then(function (response) {
        setval(response.data)
        const img_big = response.data.thumbnail;
        setShowImage(img_big)
        setstatus(true)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [params.id])

  const handleClick = (value) => {
    setShowImage(Arr[value]);
  };

  if (status) {
    return (
      <div className="App">

        <section className='main_area'>
          <Container fluid>
            <Row className='my-4'>
              <Col md={5} sm={12}>
                <div className='Img_area'>
                  {/* <img src={showImage} alt='' className='img_big'> */}
                  <ReactImageMagnify {...{
                    smallImage: {
                      // alt: '',
                      isFluidWidth: true,
                      src: {showImage}
                    },
                    largeImage: {
                      src: {showImage},
                      width: 1200,
                      height: 1800
                    }
                  }} />
                  {/* </img>  */}
                </div>

              </Col>
              <Col md={7} sm={12}>
                <div className='cantain_area py-5 px-1'>
                  <div className='pro_title'>
                    <h3>{val.title}</h3>
                  </div>
                  <hr className="product-divider"></hr>
                  <div className='price'><h3>$ {val.price}</h3>
                  </div>
                  <div className='star d-flex'>
                    <h2>{val.rating} </h2><h4 className='pt-2'>(Rating)</h4>
                  </div>
                  <div className='disc'>
                    <p>{val.description}</p>
                  </div>
                  <hr className="product-divider"></hr>
                  <a className="btn btn-dark btn-rounded btn-icon-right">Add to Cart</a>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className='p-0'>
                <ul className='d-flex p-0 '>
                  {
                    Arr.map((data, index) => {
                      return (
                        <li className='px-2'>
                          <div key={index} className='smallImg_area d-flex '>
                            <img src={data} alt='' onClick={() => handleClick(index)} className='img-fluid img_small' >
                              {/* <GlassMagnifier
                                 imageSrc={data}
                                 imageAlt="Example"
                                 className='img-fluid img_small'
                                 onClick={() => handleClick(index)}
                              /> */}
                            </img>
                          </div></li>
                      )
                    })
                  }</ul>
              </Col>

            </Row>
          </Container>
        </section>
      </div>

    );
  }
  else {
    return (
      <>
        <div className='loader'>
        </div>
      </>
    )
  }
}
export default Singleproduct;