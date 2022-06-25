import React from 'react'
import { NavLink } from 'react-router-dom'
// import Header from '../../../components/header/header'
import './registerUser.css'
import { useState } from 'react'
//import { httpPOst } from '../../../services/axios'
// import { toast } from 'react-toastify'
import { register } from '../../../services/auth'
import { Col, Container, Form, Row, ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
const RegisterUser = () => {

    let default_data = {
        name: "",
        email: "",
        password: "",
        billing_location: "",
        shipping_location: "",

        // address: {
        //     billing: {
        //         location: ""
        //     },
        //     shipping: {
        //         location: ""
        //     }
        // },
        role: "",
        date_of_birth: "",
        image: ""

    }
    let [error, setError] = useState(default_data);
    let [data, setData] = useState(default_data);
    let navigate = useNavigate();
    console.log(data)

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
        validateFormData(name, value);
    }

    const validateFormData = (field, value) => {
        let msg = ""
        switch (field) {
            case "name":
                msg = !value ? "Name is required." : "";
                break;
            case "email":
                msg = !value ? "Email is required." : (value.includes('@') ? '' : 'Invalid Email');
                break;
            case "password":
                msg = !value ? "Pasword is required." : (value.length < 8 ? 'Password must be atleast 8 character' : "");
                break;
            default:
        }
        setError({
            ...error,
            [field]: msg
        })
    }


    const submitForm = async (e) => {
        e.preventDefault();
        try {
            let response = await register(data);
            if (response.status) {
                toast.success(response.msg);
                localStorage.setItem("RegDetails", JSON.stringify(response))
                navigate('/loginpage')
            }
            else {
                toast.error(response.msg);
            }
        } catch (error) {
            console.error("register: ", error);
            // error.response.msg
            toast.error(error.msg);
        }



    }

    return (<>
        
        <ToastContainer />
        <Container className='mt-3'>
            <Row>
                <Col sm={12}>
                    <h3 className='text-center'>Register your Account here!!</h3>
                    <hr />
                    <Row>
                        <Col>
                            <Form onSubmit={submitForm} >
                                <Form.Group className='mb-3 mt-3 row' controlId='name'>
                                    <Form.Label className='col-sm-2'>Full Name:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type='text'
                                            className='form-control-sm'
                                            required
                                            name="name"
                                            placeholder='Enter your full Name'
                                            onChange={handleChange}

                                        />
                                        <small className='text-danger'><em>{error.name}</em></small>
                                    </Col>
                                </Form.Group>
                                <Form.Group className='mb-3 mt-3 row' controlId='email'>
                                    <Form.Label className='col-sm-2'>Email:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type='email'
                                            className='form-control-sm'
                                            required
                                            name="email"
                                            placeholder='Enter your Email'
                                            onChange={handleChange}
                                        />
                                        <small className='text-danger'><em>{error.email}</em></small>
                                    </Col>
                                </Form.Group>
                                <Form.Group className='mb-3 mt-3 row' controlId='password'>
                                    <Form.Label className='col-sm-2'>Password:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type='password'
                                            className='form-control-sm'
                                            required
                                            name="password"
                                            placeholder='Enter your Password'
                                            onChange={handleChange}
                                        />
                                        <small className='text-danger'><em>{error.password}</em></small>
                                    </Col>
                                </Form.Group>
                                <Form.Group className='mb-3 mt-3 row' controlId='address_billing'>
                                    <Form.Label className='col-sm-2'>Address (Billing):</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="textarea"
                                            rows={1}
                                            className='form-control-sm'
                                            required
                                            placeholder='Enter your billing address'
                                            name='billing_location'
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    billing_location: e.target.value
                                                    // address: {
                                                    //     ...data.address,
                                                    //     billing: {
                                                    //         location: e.target.value
                                                    //     }
                                                    // }
                                                })
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group className='mb-3 mt-3 row' controlId='address_shipping'>
                                    <Form.Label className='col-sm-2'>Address (Shipping):</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            as="textarea"
                                            rows={1}
                                            className='form-control-sm'
                                            required
                                            placeholder='Enter your shipping address'
                                            name='shipping_location'
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    shipping_location: e.target.value
                                                })
                                            }}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group className='mb-3 mt-3 row' controlId='role'>
                                    <Form.Label className='col-sm-2'>Role:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Select aria-label="Default select example"
                                            name='role'
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    role: e.target.value
                                                })
                                            }}>
                                            <option>Open this select menu</option>
                                            <option value="customer">Buyer</option>
                                            <option value="seller">Seller</option>
                                            <option value="admin">Admin</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group className='mb-3 mt-3 row' controlId='date_of_birth'>
                                    <Form.Label className='col-sm-2'>Date_of_Birth:</Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            type="date"
                                            className='form-control-sm'
                                            required
                                            placeholder='Enter your birth date'
                                            name='date_of_birth'
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    date_of_birth: e.target.value
                                                }
                                                )
                                            }}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId="formFileSm" className="mb-3 mt -3 row">
                                    <Form.Label className='col-sm-2'>Profile Image:</Form.Label>
                                    <Col sm={3}>
                                        <Form.Control type="file" size="sm" name='image' accept='image/*' onChange={
                                            (e) => {
                                                let files = e.target.files[0];

                                                let parts = files.name.split('.');
                                                let ext = parts[parts.length - 1];
                                                let allowed_images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

                                                if (!allowed_images.includes(ext.toLowerCase())) {
                                                    setError({
                                                        ...error,
                                                        image: "Invalid File Format"
                                                    });
                                                } else {
                                                    setError({
                                                        ...error,
                                                        image: null
                                                    })
                                                    setData({
                                                        ...data,
                                                        image: files
                                                    })
                                                }
                                                console.log(e.target.files);
                                            }
                                        } />

                                        <span className='text-danger'>
                                            {
                                                error.image
                                            }
                                        </span>
                                        <Col sm="3">
                                            {
                                                data.image ?
                                                    <img className='img img-fluid' alt='' src={URL.createObjectURL(data.image)} />
                                                    :
                                                    <>
                                                        {/* <div style={{
                                                            "background": "#cccccc",
                                                            "height": "130px",
                                                            "width": "130px",
                                                            "borderRadius": "50%",
                                                            "margin": "-40px 340px"
                                                        }}>
                                                            <span>{
                                                                data.name
                                                            }</span>
                                                        </div> */}
                                                    </>
                                            }

                                        </Col>
                                    </Col>
                                </Form.Group>

                                <Form.Group className='mb-3 mt-3 row' controlId='cancel'>

                                    <Col sm={{ span: 9, offset: 2 }}>
                                        <button type="reset" className='btn btn-sm btn-danger me-3'>Cancel</button>
                                        <button type="submit" className='btn btn-sm btn-success'>Create Account</button>

                                    </Col>
                                </Form.Group>

                            </Form>
                            <div id='sign_link'>
                                <div id="para_style">
                                    <p>Already Have an Account?</p>
                                </div>
                                <NavLink className="nav-link" to="/loginpage" >Sign in</NavLink>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    </>
    )
}

export default RegisterUser