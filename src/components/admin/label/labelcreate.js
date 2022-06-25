import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addLabel } from '../../../services/label'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import LabelForm from './label-form.component'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'
import { ucFirst } from '../../../helpers/funstions'


const LabelCreate = (props) => {
     
    let navigate = useNavigate();
    let def_vals = {
        title: "",
        link: "",
        image: "",
        status: "",
        type: props.type,
        sel_status: ""
    }


    const addLabelContent = async (values) => {
        //write add banner request code
        console.log("values:", values)
       
        if (values.sel_status) {
            delete values.sel_status
        }
         try {
            let response = await addLabel(values);
            console.log("response: ", response)
            if(response.status){
                toast.success(response.msg)
                let type =props.type;
                if(type === 'brand') {
                    type="brands";
                }
                navigate("/admin/"+type);
            }else {
                toast.error(response.msg)
            }

        } catch(error) {
            // throw error 
            console.error("Label create: ", error);
        }
    }




    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">{ucFirst(props.type)} Create</h1>

                <AdminBreadcrumb title={ucFirst(props.type+ " Create")}/>
                <div className="card mb-4">
                    <div className="card-body">
                        <LabelForm
                            onSubmitLabel={addLabelContent}
                            initialVals={def_vals}
                            type={props.type} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LabelCreate