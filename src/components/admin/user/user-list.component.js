import React from 'react'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteUserById, getUser } from '../../../services/user';
import { StatusBadge } from '../../common/badge/status-badge.component';
// import { formatDate } from '../../../helpers/funstions';
import { ActionButtons } from '../../common/table-buttons/action-button.component';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SingleImageView from '../../common/image-view/image-view.component';
import { useParams } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const UserList = (props) => {

  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let params = useParams();
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row =><SingleImageView image={row.image} width={props.type==='brand' ? '45' : "75" }/> ,
    },
    {
      name: 'Role',
      selector: row => row.role,
    },
    {
      name: 'Status',
      selector: row => <StatusBadge value={row.status} />,
    },
    {
      name: 'Action',
      selector: row => <ActionButtons dataId={row._id} onDelete={deleteUser} onEdit={`/admin/user/${row._id}/edit`} />,
    },
  ];

  const getUsers = async () => {
    try {
      let data = await getUser(props.type);
      // console.log("Response: ", data)
      if (data) {
        let current_user = JSON.parse(localStorage.getItem('login_user_info'))
        let all_users = data.result.filter((o) => current_user.email !== o.email)
        setData(all_users)

      }
    } catch (error) {
      console.log("User: ", error)
    } finally {
      setLoading(false);
    }
  }

  const deleteUser = async (data) => {
    // console.log(data)
    try {
      let success = await deleteUserById(data);
      if (success.status) {
        setLoading(true);
        getUsers();
        toast.success(success.msg)
      } else {
        toast.error(success.msg)
      }
    }catch (error) {
      console.error("label error: ", error);
    }
  }

  useEffect(() => {
    getUsers();

  }, [params]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <h1 className="mt-4">User List</h1>
        <AdminBreadcrumb title="User Listing" />
        <div className="card mb-4">
          <div className="card-body">
            <DataTable
              columns={columns}
              data={data}
              selectableRows
              pagination
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              highlightOnHover
              pointerOnHover
              progressPending={loading}

            />
          </div>
        </div>
        <div></div>

      </div>
    </>

  )
}

export default UserList