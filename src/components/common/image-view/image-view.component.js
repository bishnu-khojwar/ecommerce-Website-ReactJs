import React from 'react'

const SingleImageView = (props) => {
  return (
   <>
   <img src={process.env.REACT_APP_IMAGE_URL+props.image}
   alt=""
   className = 'img img-fluid'
   style={{
    "width": props.width+"px"
   }}
   />
   </>
  )
}

export default SingleImageView