import { NavLink } from "react-router-dom"
import "./action-btns.css"
import React from "react"
import Swal from "sweetalert2"
export const ActionButtons = (props) => {
    const deleteData = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                props.onDelete(props.dataId)
                
            }
          })
    }
    return(
        <>
        <NavLink to={props.onEdit} className="btn btn-sm btn-success me-1 act-btns">
            <i className="fa fa-pen"></i></NavLink>
        <a href="/" onClick={deleteData} className="btn btn-sm btn-danger act-btns">
        <i className="fa fa-times"></i></a>
        </>
    )
}