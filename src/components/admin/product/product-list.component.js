import React from 'react'
import AdminBreadcrumb from '../breadcrumb/admin-breadcrumb'
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteProductById, getProduct } from '../../../services/product';
import { StatusBadge } from '../../common/badge/status-badge.component';
// import { formatDate, ucFirst } from '../../../helpers/funstions';
import { ActionButtons } from '../../common/table-buttons/action-button.component';
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SingleImageView from '../../common/image-view/image-view.component';
import { useParams } from 'react-router-dom';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const ProductList = (props) => {

  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let params = useParams();
  const columns = [
    {
      name: 'Name',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category.title,
      sortable: true,
    },
    {
      name: 'Image',
      selector: row =><SingleImageView image={row.images[0]} width={props.type==='product' ? '45' : "75" }/> ,
    },
    {
      name: "Price",
      selector: row => row.price,
    },
    {
      name: 'Status',
      selector: row => <StatusBadge value={row.status} />,
    },
    {
      name: 'Action',
      selector: row => <ActionButtons dataId={row._id} onDelete={deleteProduct} onEdit={`/admin/product/${row._id}/edit`} />,
    },
  ];

  const getProducts = async () => {
    try {
      let data = await getProduct(props.type);
      // console.log("Response: ", data)
      if (data) {
        setData(data.result)

      }
    } catch (error) {
      console.log("Product: ", error)
    } finally {
      setLoading(false);
    }
  }

  const deleteProduct = async (data) => {
    // console.log(data)
    try {
      let success = await deleteProductById(data);
      if (success.status) {
        setLoading(true);
        getProducts();
        toast.success(success.msg)
      } else {
        toast.error(success.msg)
      }
    }catch (error) {
      console.error("label error: ", error);
    }
  }

  useEffect(() => {
    getProducts();

  }, [params]);
  return (
    <>
      <ToastContainer />
      <div className="container-fluid px-4">
        <h1 className="mt-4">Product List</h1>
        <AdminBreadcrumb title="Product Listing" />
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

export default ProductList