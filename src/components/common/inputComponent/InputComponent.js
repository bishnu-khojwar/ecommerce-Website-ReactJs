import React, { useState } from 'react'

const InputComponent = (props) => {

    let [err, setErr] = useState();

    const handleChange = (e) => {
        // console.log(e);
        let { name, value, required, type } = e.target;
        //console.log(required)
        // console.log("name :", name, "value :", value, "required :", required)
        if (required && !value) {
            setErr(name + " is required");
        }
        else {
            if (type === 'email') {
                let msg = value.includes('@') ? '' : "Invalid Email"
                setErr(msg);
            } else {
                setErr("")

            }
            props.handleChange(value);
        }
    }
    return (
        <>
            <input
                name={props.name}
                type={props.type}
                required={props.required}
                placeholder={props.placeholder}
                // defaultValue={props.defaultValue ?? ''}
                className="form-control form-control-sm"
                onChange={handleChange}
            />
            <span className="text-danger">{err}</span>
        </>
    )
}

export default InputComponent