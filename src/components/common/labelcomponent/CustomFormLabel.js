import React from 'react'

const CustomFormLabel = (props) => {
  return (
    <label className='form-label col-sm-3'>{props.title}
    {
        props.isRequired ? <em style={{"color":"#ff0000"}}>*</em> : ''
    }
    </label>
  )
}

export default CustomFormLabel