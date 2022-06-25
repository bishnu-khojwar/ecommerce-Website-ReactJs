import React, { useEffect, useState } from 'react'
import { Form, Col } from "react-bootstrap"
import Select from "react-select"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { getLabelByType } from '../../../services/label'
import { getCategory } from '../../../services/category'


const CategoryForm = (props) => {
    /* eslint-disable no-unused-vars */
    const [statuses, setStatuses] = useState([
        { value: 'active', label: 'Published' },
        { value: 'inactive', label: 'Un-Published' },
    ]
    );

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    let category_schema = Yup.object().shape({
        title: Yup.string()
            .required('title is Required!'),
        summary: Yup.string(),
        brand: Yup.array(),
        status: Yup.string()
            .required('status is required!')

    });

    let formik = useFormik({
        initialValues: props.initialVals,
        validationSchema: category_schema,
        onSubmit: (values) => {
            console.log("form value: ", values)
            props.onSubmitCategory(values);
        }
    })

    let getAllParentCats = async () => {
        try {
            let cats = await getCategory();
            if (cats.result) {
                let cat_opt = cats.result.map((o) => ({
                    label: o.title,
                    value: o._id
                }))
                setCategories(cat_opt)
            }

        } catch (error) {
            console.error("cat fetch: ", error)
        }

    }
    let getAllBrands = async () => {
        try {
            let result = await getLabelByType('brand');
            if (result.result) {
                let brand_opt = result.result.map((o) => ({
                    label: o.title,
                    value: o._id
                }
                ))
                setBrands(brand_opt);
            }

        } catch (error) {
            console.log("brand error: ", error)
        }
    }

    useEffect(() => {
        getAllParentCats();
        getAllBrands();
        let sel_status = {
            label: props.initialVals.status === 'active' ? "Published" : "Un-Published",
            value: props.initialVals.status
        }
        formik.setValues({
            ...props.initialVals,
            sel_status: sel_status
        })

    }, [props.initialVals])
    // console.log(formik.values)
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


                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Summary: </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            as='textarea'
                            rows='3'
                            name="summary"
                            size="sm"
                            onChange={formik.handleChange}
                            value={formik.values.summary}
                        ></Form.Control>
                        {
                            formik.errors.summary && formik.touched.summary ?
                                <small className='text-danger'>{formik.errors.summary}</small>
                                :
                                ""
                        }
                    </Col>
                </Form.Group>

                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Parent: </Form.Label>
                    <Col sm={9}>
                        <Select
                            options={categories}
                            className="form-control-sm"
                            name="parent_id"
                            onChange={(e) => {
                                let val = e.value;
                                formik.setValues({
                                    ...formik.values,
                                    parent_id: val,
                                    sel_parent_id: e
                                })

                            }}
                            value={formik.values.sel_parent_id}
                        />

                        {
                            formik.errors.parent_id && formik.touched.parent_id ?
                                <small className='text-danger'>{formik.errors.parent_id}</small>
                                :
                                ""
                        }
                    </Col>
                </Form.Group>


                <Form.Group className="row mb-3">
                    <Form.Label className='col-sm-3'>Brands: </Form.Label>
                    <Col sm={9}>
                        <Select
                            options={brands}
                            name="brand"
                            isMulti
                            onChange={(e) => {
                                formik.setValues({
                                    ...formik.values,
                                    brand: (e.map((o) => o.value)),
                                    sel_brands: e
                                })

                            }}
                            value={formik.values.sel_brands}
                        />

                        {
                            formik.errors.brand && formik.touched.brand ?
                                <small className='text-danger'>{formik.errors.brand}</small>
                                :
                                ""
                        }
                    </Col>
                </Form.Group>

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
                        <button type='submit' className='btn-success'>Category create</button>
                    </div>
                </Form.Group>
            </Form>
        </>
    )
}

export default CategoryForm