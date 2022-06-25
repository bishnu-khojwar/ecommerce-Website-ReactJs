import React from 'react'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteLabelById, getLabelByType } from '../../../services/label';
import { StatusBadge } from '../../common/badge/status-badge.component';
import { formatDate } from '../../../helpers/funstions';
import { ActionButtons } from '../../common/table-buttons/action-button.component';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SingleImageView from '../../common/image-view/image-view.component';
import { useParams } from 'react-router-dom';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const LabelList = (props) => {

  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let params = useParams();
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row =><SingleImageView image={row.image} width={props.type==='brand' ? '45' : "75" }/> ,
    },
    {
      name: 'Status',
      selector: row => <StatusBadge value={row.status} />,
    },
    {
      name: 'Created At',
      selector: row => formatDate(row.createdAt),
    },
    {
      name: 'Action',
      selector: row => <ActionButtons dataId={row._id} onDelete={deleteLabel} onEdit={`/admin/banner/${row._id}/edit`} />,
    },
  ];

  const getListBytype = async () => {
    try {
      let data = await getLabelByType(props.type);
      // console.log("Response: ", data)
      if (data) {
        setData(data.result)

      }
    } catch (error) {
      console.log("Label: ", error)
    } finally {
      setLoading(false);
    }
  }

  const deleteLabel = async (data) => {
    // console.log(data)
    try {
      let success = await deleteLabelById(data);
      if (success.status) {
        setLoading(true);
        getListBytype();
        toast.success(success.msg)
      } else {
        toast.error(success.msg)
      }
    }catch (error) {
      console.error("label error: ", error);
    }
  }

  useEffect(() => {
    getListBytype();

  }, [params]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <h1 className="mt-4">{props.type} List</h1>
        <AdminBreadcrumb title={props.type + " Listing"} />
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

export default LabelList