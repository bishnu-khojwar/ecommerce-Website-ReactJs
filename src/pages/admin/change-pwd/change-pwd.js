import { useFormik } from 'formik'
import React from 'react'
import { Form, Col } from 'react-bootstrap'
// import { NavLink } from 'react-router-dom'
import AdminBreadcrumb from '../../../components/admin/breadcrumb/admin-breadcrumb'
import "./change-pwd.css"
import * as Yup from "yup"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { changePassword } from '../../../services/auth'
import {  useNavigate } from 'react-router-dom'

// const validate = values => {
//     const errors = {};
//     if (!values.password) {
//         errors.password = ' Password is Required';
//     } else if (values.password.length < 8) {
//         errors.password = 'password must be atleast 8 characters ';
//     }
//     if (!values.re_password) {
//         errors.re_password = ' Re-password is Required';
//     } else if (values.re_password.length < 8) {
//         errors.re_password = 'Re-password must be atleast 8 characters ';
//     } else if (values.re_password !== values.password) {
//         errors.re_password = "Password and re-password must be same"
//     }

//     return errors;
// };


const ChangePwd = () => {

    let password_schema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'password must be atleast 8 characters!')
            .required('Password is Required!'),
        re_password: Yup.string()
            .min(8, 'Re-password must be atleast 8 characters!')
            .required('Re-password is Required!')
            .oneOf([Yup.ref('password'), null], "Password and re-password must be same"),
    });

    let default_fields = {
        password: "",
        re_password: ""
    }
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('login_token')
        navigate('/loginpage');
    }
    const handleSubmit = async (values) => {
        // console.log(values)
        //make api call
        try {
            let success = await changePassword(values)
            toast.success(success.msg)
            logout();

        } catch (error) {
            toast.error(error)
        }
    }

    const formik = useFormik({
        initialValues: default_fields,
        // validate,
        validationSchema: password_schema,
        onSubmit: handleSubmit
    })



    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">Change Password</h1>
                <AdminBreadcrumb title="Change Password" />
                <div className="card mb-4">
                    <div className="card-body">
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3">
                                <Form.Label className='col-sm-3'>Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type='password'
                                        name="password"
                                        size="sm"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    ></Form.Control>
                                    {
                                        formik.errors.password && formik.touched.password ?
                                            <small className='text-danger'>{formik.errors.password}</small>
                                            :
                                            ""
                                    }

                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className='col-sm-3'>Re-Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type='password'

                                        name="re_password"
                                        size="sm"
                                        value={formik.values.re_password}
                                        onChange={formik.handleChange}></Form.Control>
                                    {
                                        formik.errors.re_password && formik.touched.re_password ?
                                            <small className='text-danger'>{formik.errors.re_password}</small>
                                            :
                                            ""
                                    }
                                </Col>
                            </Form.Group>
                            <Form.Group className='row mb-3'>
                                <div className="col-sm-9 offset-sm-3">
                                    <button type='submit' className='btn-success'>Change Password</button>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div></div>

            </div>
        </>
    )
}

export default ChangePwd