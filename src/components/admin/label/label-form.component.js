import React, { useEffect, useState } from 'react'
import { Form, Col } from "react-bootstrap"
import Select from "react-select"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { ucFirst } from '../../../helpers/funstions'


const LabelForm = (props) => {

    const [statuses] = useState([
        { value: 'active', label: 'Published' },
        { value: 'inactive', label: 'Un-Published' },
    ]
    );
    // const [loading, setLoading] = useState(true);
    let label_schema = Yup.object().shape({
        title: Yup.string()
            .required('title is Required!'),
        link: Yup.string().url(),
        status: Yup.string()
            .required('status is required!')

    });

    let formik = useFormik({
        initialValues: props.initialVals,
        validationSchema: label_schema,
        onSubmit: (values) => {
            console.log("form value: ", values)
            props.onSubmitLabel(values);
        }
    })

    useEffect(() => {
        let sel_status = {
            label: props.initialVals.status === 'active' ? "Published" : "Un-Published",
            value: props.initialVals.status
        }
        formik.setValues({
            ...props.initialVals,
            sel_status: sel_status
        })

    }, [props.initialVals])
    console.log("values: ", props)
    return (
        <>

            <Form onSubmit={formik.handleSubmit}>

                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Title: </Form.Label>
                    <Col sm={9}>
                        <Form.Control type='text'
                            name="title"
                            size="sm"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        ></Form.Control>
                        {
                            formik.errors.title && formik.touched.title ?
                                <small className='text-danger'>{formik.errors.title}</small>
                                :
                                ""
                        }
                    </Col>
                </Form.Group>

                {
                    props.type === "banner" ?
                        <Form.Group className="row mb-3">
                            <Form.Label className='col-sm-3'>Link: </Form.Label>
                            <Col sm={9}>
                                <Form.Control type='url'
                                    name="link"
                                    size="sm"
                                    onChange={formik.handleChange}
                                    value={formik.values.link}
                                ></Form.Control>
                                {
                                    formik.errors.link && formik.touched.link ?
                                        <small className='text-danger'>{formik.errors.link}</small>
                                        :
                                        ""
                                }
                            </Col>

                        </Form.Group>
                        : <></>
                }

                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Image: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type="file"
                            size="sm"
                            name='image'
                            accept='image/*'
                            onChange={
                                (e) => {
                                    let files = e.target.files[0];

                                    let parts = files.name.split('.');
                                    let ext = parts[parts.length - 1];
                                    let allowed_images = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

                                    if (!allowed_images.includes(ext.toLowerCase())) {
                                        formik.setErrors({
                                            ...formik.errors,
                                            image: "Invalid image format"

                                        })
                                    } else {
                                        formik.setValues({
                                            ...formik.values,
                                            image: files
                                        })
                                    }
                                }
                            } />

                        {
                            formik.errors.image && formik.touched.image ?
                                <small className='text-danger'>{formik.errors.image}</small>
                                :
                                ""
                        }
                        <Col sm="3">
                            {
                                formik.values.image && typeof (formik.values.image) !== 'string' ?
                                    <img className='img img-fluid' alt='' src={URL.createObjectURL(formik.values.image)} />
                                    :
                                    <>
                                        <img className='img img-fluid' alt='' src={process.env.REACT_APP_IMAGE_URL + formik.values.image} />
                                    </>
                            }
                        </Col>
                    </Col>

                </Form.Group>
                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Status: </Form.Label>
                    <Col sm={9}>
                        <Select
                            options={statuses}
                            name="status"
                            onChange={(e) => {
                                let val = e.value;
                                formik.setValues({
                                    ...formik.values,
                                    status: val,
                                    sel_status: e
                                })

                            }}
                            value={formik.values.sel_status}
                        />

                        {
                            formik.errors.status && formik.touched.status ?
                                <small className='text-danger'>{formik.errors.status}</small>
                                :
                                ""
                        }
                    </Col>
                </Form.Group>
                <Form.Group className='row mb-3'>
                    <div className="col-sm-9 offset-sm-3">
                        <button type='submit' className='btn-success'>{ucFirst(props.type)} Create</button>
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}

export default LabelForm