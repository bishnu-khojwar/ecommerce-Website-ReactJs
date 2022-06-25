import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addCategory } from '../../../services/category'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import CategoryForm from './category-form.component'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'



const CategoryCreate = (props) => {

    let navigate = useNavigate();
    let def_vals = {
        title: "",
        summary: "",
        image: "",
        status: "",
        parent_id: "",
        brand: "",
        sel_status: "",
        sel_parent_id: "",
        sel_brands: ""

    }


    const addCategoryContent = async (values) => {
        //write add banner request code
        console.log("values:", values)

        if (values.sel_status) {
            delete values.sel_status
        }

        if (values.sel_parent_id) {
            delete values.sel_parent_id
        }
        if (values.sel_brands) {
            delete values.sel_brands
        }

        try {
            let response = await addCategory(values);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/category");
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("Category create: ", error);
        }
    }




    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">Category Create</h1>

                <AdminBreadcrumb title="Create category" />
                <div className="card mb-4">
                    <div className="card-body">
                        <CategoryForm
                            onSubmitCategory={addCategoryContent}
                            initialVals={def_vals}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCreate