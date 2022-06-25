import React from 'react'
// import { Outlet } from 'react-router-dom'
import "../../../assets/CSS/adminlayout.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { AdminSidebar, AdminTopnav } from '../../../components/admin';



const AdminLayout = () => {
  return (
    <>
      <ToastContainer />
      <AdminTopnav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <AdminSidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                <div>
                  <a href="#!">Privacy Policy</a>
                  &middot;
                  <a href="#!">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default AdminLayout