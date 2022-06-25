import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css"
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import UserForm from './user-form.component'
import { ucFirst } from '../../../helpers/funstions'
import { getUserByID } from '../../../services/user'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import { updateUserById } from '../../../services/user'


const UserEdit = (props) => {
    /* eslint-disable no-unused-vars */

    const [user, setUser] = useState({});
    let params = useParams();
    let navigate = useNavigate();

    const updateUser = async (data) => {
        // console.log("update data: ", data)
        let updated_data = {
            name: data.name,
            status: data.status,
            role: data.role,
            date_of_birth: data.date_of_birth,
            billing_location: data.billing_location,
            shipping_location: data.shipping_location,

        }
        if(!updated_data.date_of_birth){
            delete updated_data.date_of_birth;
        }

        if (typeof (data.image) === 'object') {
            updated_data.image = data.image
        }
        console.log(updated_data)
        try {
            let response = await updateUserById(updated_data, data._id);
            console.log("response: ", response)
            if (response.status) {
                toast.success(response.msg)
                navigate("/admin/user");
            } else {
                toast.error(response.msg)
            }

        } catch (error) {
            // throw error 
            console.error("User Update: ", error);
        }
    }
    const getUserByUserId = async () => {
        try {
            let data = await getUserByID(params.id)
            if (data.status) {
                let default_data = data.result
                setUser(default_data);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error("User Edit: ", error)
        }
    }
    useEffect(() => {
        getUserByUserId();
    }, [])
    return (
        <>
            <ToastContainer />
            <div className="container-fluid px-4">
                <h1 className="mt-4">{ucFirst(props.type)} Update</h1>
                <AdminBreadcrumb title={ucFirst(props.type) + " Update"} />
                <div className="card mb-4">
                    <div className="card-body">
                        <UserForm
                            onSubmitUser={updateUser}
                            initialVals={user}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserEdit