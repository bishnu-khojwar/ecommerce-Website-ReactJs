import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addProduct } from '../../../services/product'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import ProductForm from './product-form.component'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'



const ProductCreate = (props) => {

    let navigate = useNavigate();
    let def_vals = {
        title: "",
        price: "",
        images: "",
        status: "",
        discount: "",
        category: "",
        description: "",
        brand: "",
        seller: "",
        is_featured: "",
        tag: "",
        stock: "",
        sel_status: "",
        sel_category: "",
        sel_brand: "",
        sel_seller: "",

    }


    const addProductContent = async (values) => {
        //write add banner request code
        console.log("values:", values)

        if (values.sel_status) {
            delete values.sel_status
        }

        if (values.sel_category) {
            delete values.sel_category
        }

        if (values.sel_brand) {
            delete values.sel_brand
        }

        if (values.sel_seller) {
            delete values.sel_seller
        }

        try {
            let response = await addProduct(values);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/product");
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("Product create: ", error);
        }
    }




    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">Product Create</h1>

                <AdminBreadcrumb title="Create product" />
                <div className="card mb-4">
                    <div className="card-body">
                        <ProductForm
                            onSubmitProduct={addProductContent}
                            initialVals={def_vals}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCreate