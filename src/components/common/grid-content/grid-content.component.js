import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
const GridComponent = (props) => {
    return (
        <>
            <Container>
                <Row className='mt-4'>
                    <Col>
                        <h4 className='text-center'>{props.title}</h4>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    {
                        props.data && props.data.map((brand, index) => (
                            <Col sm={12} md={1} key={index}>
                                <NavLink to={"/brand/"+brand.slug}>
                                    <img src={process.env.REACT_APP_IMAGE_URL+brand.image}  className='img img-fluid img-thumbnail' alt="" />
                                </NavLink>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default GridComponent