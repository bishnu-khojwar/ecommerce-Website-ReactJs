import React from 'react'
import AdminBreadcrumb from '../../../components/admin/breadcrumb/admin-breadcrumb'

const AdminDashboard = () => {
  return (
    <>
     
      <div className="container-fluid px-4">
        <h1 className="mt-4">Static Navigation</h1>
        <AdminBreadcrumb title="Admin Page" />
        <div className="card mb-4">
          <div className="card-body">
            <p className="mb-0">
              this is admin dashboard.
            </p>
          </div>
        </div>
        <div></div>
        <div className="card mb-4"><div className="card-body">When scrolling, the navigation stays at the top of the page. This is the end of the static navigation demo.</div></div>
      </div>
    </>
  )
}

export default AdminDashboard