import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css"
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import ProductForm from './product-form.component'
import { ucFirst } from '../../../helpers/funstions'
import { getProductByID } from '../../../services/product'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import { updateProductById } from '../../../services/product'


const ProductEdit = (props) => {
    /* eslint-disable no-unused-vars */

    const [product, setProduct] = useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateProduct = async (data) => {
        // console.log("update data: ", data)
        let updated_data = {
            title: data.title,
            price: data.price,
            images: data.images,
            status: data.sel_status.value,
            discount: data.discount,
            category: data.sel_category.value,
            description: data.description,
            brand: data.sel_brand.value,
            seller: data.sel_seller.value,
            is_featured: data.is_featured,
            tag: data.tag,
            stock: data.stock,
            uploaded_images: data.uploaded_images
           
        }
        if (typeof (data.image) === 'object') {
            updated_data.image = data.image
        }
        // console.log(updated_data)
        try {
            // updated_data.brand = updated_data.brand.map((o) => o._id)
            let response = await updateProductById(updated_data, data._id);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/product");
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("Product Update: ", error);
        }
    }
    const getProductByProductId = async () => {
        try {
            let data = await getProductByID(params.id)
            if (data.status) {
                let default_data = data.result
                if (default_data.brand) {
                    default_data = {
                        ...default_data,

                        sel_brand: {
                            label: default_data.brand.title,
                            value: default_data.brand._id
                        },
                        sel_category: {
                            label: default_data.category.title,
                            value: default_data.category._id
                        },
                        sel_status: {
                            label: default_data.status === 'active' ? 'Published' : 'Un-Published',
                            value: default_data.status
                        },
                        sel_seller: {
                            label: default_data.seller.name,
                            value: default_data.seller._id
                        }
                    }

                }
                setProduct(default_data);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error("Product Edit: ", error)
        }
    }
    useEffect(() => {
        getProductByProductId();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">{ucFirst(props.type)} Update</h1>
                <AdminBreadcrumb title={ucFirst(props.type) + " Update"} />
                <div className="card mb-4">
                    <div className="card-body">
                        <ProductForm
                            onSubmitProduct={updateProduct}
                            initialVals={product}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductEdit