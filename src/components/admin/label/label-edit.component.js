import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css"
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import LabelForm from './label-form.component'
import { ucFirst } from '../../../helpers/funstions'
import { getLabelByID } from '../../../services/label'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import { updateLabelById } from '../../../services/label'


const LabelEdit = (props) => {
    /* eslint-disable no-unused-vars */

    const [label, setLabel] = useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateLabel = async (data) => {
        console.log("update data: ", data)
        let updated_data = {
            title: data.title,
            link: data.link,
            status: data.status,
            type: data.type
        }
        if (typeof (data.image) === 'object') {
            updated_data.image = data.image
        }
        try {
            let response = await updateLabelById(updated_data, data._id);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/" + props.type);
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("Label Update: ", error);
        }
    }
    const getLabelByLabelId = async () => {
        try {
            let data = await getLabelByID(params.id)
            if (data.status) {
                setLabel(data.result);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error("Label Edit: ", error)
        }
    }
    useEffect(() => {
        getLabelByLabelId();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">{ucFirst(props.type)} Update</h1>
                <AdminBreadcrumb title={ucFirst(props.type) + " Update"} />
                <div className="card mb-4">
                    <div className="card-body">
                        <LabelForm
                            onSubmitLabel={updateLabel}
                            initialVals={label} 
                            type={props.type}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LabelEdit