import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css"
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import CategoryForm from './category-form.component'
import { ucFirst } from '../../../helpers/funstions'
import { getCategoryByID } from '../../../services/category'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import { updateCategoryById } from '../../../services/category'


const CategoryEdit = (props) => {
    /* eslint-disable no-unused-vars */

    const [category, setCategory] = useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateCategory = async (data) => {
        // console.log("update data: ", data)
        let updated_data = {
            title: data.title,
            summary: data.summary,
            parent_id: data.parent_id,
            brand: data.brand,
            status: data.status,
            // type: data.type
        }
        if (typeof (data.image) === 'object') {
            updated_data.image = data.image
        }
        console.log(updated_data)
        try {
            updated_data.brand = updated_data.brand.map((o) => o._id)
            let response = await updateCategoryById(updated_data, data._id);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/category");
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("Category Update: ", error);
        }
    }
    const getCategoryByCategoryId = async () => {
        try {
            let data = await getCategoryByID(params.id)
            if (data.status) {
                let default_data = data.result
                if (default_data.brand) {
                    default_data = {
                        ...default_data,
                        sel_brands: default_data.brand.map((o) => ({
                            label: o.title,
                            value: o._id
                        }))
                    }

                }
                setCategory(default_data);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error("Category Edit: ", error)
        }
    }
    useEffect(() => {
        getCategoryByCategoryId();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">{ucFirst(props.type)} Update</h1>
                <AdminBreadcrumb title={ucFirst(props.type) + " Update"} />
                <div className="card mb-4">
                    <div className="card-body">
                        <CategoryForm
                            onSubmitCategory={updateCategory}
                            initialVals={category}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryEdit