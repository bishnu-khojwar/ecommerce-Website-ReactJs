import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addUser } from '../../../services/user'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import UserForm from './user-form.component'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'



const UserCreate = () => {

    let navigate = useNavigate();
    let def_vals = {
        name: "",
        email: "",
        image: "",
        status: "",
        role: "",
        date_of_birth: "",
        billing_location: "",
        shipping_location: "",
        password: "",
        sel_status: "",
        sel_role: ""

    }

    const addUserContent = async (values) => {
        //write add banner request code
        console.log(" user values:", values)

        if (values.sel_status) {
            delete values.sel_status
        }

        if (values.sel_role) {
            delete values.sel_role
        }

        try {
            let response = await addUser(values);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/user");
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("User create: ", error);
        }
    }




    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">User Create</h1>

                <AdminBreadcrumb title="Create user" />
                <div className="card mb-4">
                    <div className="card-body">
                        <UserForm
                            onSubmitUser={addUserContent}
                            initialVals={def_vals}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCreate