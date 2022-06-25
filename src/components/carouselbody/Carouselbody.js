import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './carouselbody.css'
import { Carousel } from 'react-bootstrap'

const Carousel__body = (props) => {
    return (
        <>
            <Carousel className=''>

                {
                    props.data && props.data.map((banner, index) => (
                        <Carousel.Item interval={1000} key={index}>
                            <img className='d-block w-100'
                                src={process.env.REACT_APP_IMAGE_URL+banner.image}
                                alt={banner.title} />
                        </Carousel.Item>
                    ))
                }

            </Carousel>
        </>
    )
}


export default Carousel__body