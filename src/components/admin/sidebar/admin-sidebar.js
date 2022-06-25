import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
    return (
        <>
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Features</div>
                        <NavLink className="nav-link" to="/admin">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </NavLink>

                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#banners" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Banners
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="banners" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link" href="/admin/banner/create">Add Banner</a>
                                <NavLink className="nav-link" to='/admin/banner/'>List Banner</NavLink>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Category
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="category" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <NavLink className="nav-link" to='/admin/category/create'>Add Category</NavLink>
                                <NavLink className="nav-link" to='/admin/category'>List Category</NavLink>
                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#brands" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Brands
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="brands" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <NavLink className="nav-link" to='/admin/brands/create'>Add Brands</NavLink>
                                <NavLink className="nav-link" to='/admin/brands'>List Brands</NavLink>
                            </nav>
                        </div>

                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#user" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            User
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="user" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <NavLink className="nav-link" to='/admin/user/create'>Add User</NavLink>
                                <NavLink className="nav-link" to='/admin/user'>List User</NavLink>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#products" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Products
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="products" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <NavLink className="nav-link" to='/admin/product/create'>Add Product</NavLink>
                                <NavLink className="nav-link" to='/admin/product'>List product</NavLink>
                            </nav>
                        </div>
                        <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#orders" aria-expanded="false" aria-controls="collapsePages">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                            Orders
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="orders" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link" href="/layout-static.html">Static Navigation</a>
                                <a className="nav-link" href="/layout-sidenav-light.html">Light Sidenav</a>
                            </nav>
                        </div>

                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </>
    )
}

export default AdminSidebar