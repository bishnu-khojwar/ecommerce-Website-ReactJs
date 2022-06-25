import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Card from '../components/cards/cards'
import LoginPage from '../pages/auth/login/index.login'
import AdminLayout from '../pages/admin/adminlayout/AdminLayout'
import AdminPrivateRoutes from '../pages/admin/adminprivateroutes/AdminPrivateRoutes'
// import Header from '../components/header/header'
import '../assets/CSS/adminlayout.css'
import AdminDashboard from '../pages/admin/adminDashboard/AdminDashboard'
import AdminProfile from '../pages/admin/adminProfile/adminProfile'
import RegisterUser from '../pages/auth/register/RegisterUser'
import ChangePwd from '../pages/admin/change-pwd/change-pwd'
import LabelPage from '../pages/admin/label/label.page'
import LabelCreate from '../components/admin/label/labelcreate'
import LabelList from '../components/admin/label/label-list.component'
import LabelEdit from '../components/admin/label/label-edit.component'
import CategoryPage from '../pages/admin/category/category.page'
import CategoryList from '../components/admin/category/category-list.component'
import CategoryCreate from '../components/admin/category/category-create'
import CategoryEdit from '../components/admin/category/category-edit.component'
import UserPage from '../pages/admin/user/userPage'
import UserCreate from '../components/admin/user/user-create'
import UserEdit from '../components/admin/user/user-edit.component'
import UserList from '../components/admin/user/user-list.component'
import ProductPage from '../pages/admin/product/product.page'
import ProductCreate from '../components/admin/product/product-create'
import ProductList from '../components/admin/product/product-list.component'
import ProductEdit from '../components/admin/product/product-edit.component'
import HomeLayout from '../pages/layout/homelayout'
import ErrorPage from '../pages/errorpage/errorpage'
import Home from '../components/home/Home'
const Logout = () => {
    let navigate = useNavigate()
    localStorage.removeItem('login_token');
    useEffect(() => {
        navigate("/loginpage")
    }, []);
    return (<></>)
}


const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    {/* <Route index element={<Home />} /> */}
                    <Route index element={<Home />} />
                    <Route path='products' element={<Card />} />
                    <Route path='features' element='' />
                    <Route path='loginpage' element={<LoginPage />} />
                    <Route path='register' element={<RegisterUser />} />
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>

                <Route path='/admin' element={<AdminPrivateRoutes component={<AdminLayout />} />}>
                    <Route index element={<AdminDashboard />}></Route>
                    <Route path="profile" element={<AdminProfile />}></Route>
                    <Route path="logout" element={<Logout />}></Route>
                    <Route path="pwd-change" element={<ChangePwd />}></Route>
                    <Route path="banner" element={<LabelPage />}>
                        <Route path="create" element={<LabelCreate type="banner" />}></Route>
                        <Route index element={<LabelList type="banner" />}></Route>
                        <Route path=":id/edit" element={<LabelEdit type='banner' />}></Route>
                    </Route>

                    <Route path="brands" element={<LabelPage />}>
                        <Route path="create" element={<LabelCreate type="brand" />}></Route>
                        <Route index element={<LabelList type="brand" />}></Route>
                        <Route path=":id/edit" element={<LabelEdit type='brand' />}></Route>
                    </Route>

                    <Route path="category" element={<CategoryPage />}>
                        <Route path="create" element={<CategoryCreate />}></Route>
                        <Route index element={<CategoryList />}></Route>
                        <Route path=":id/edit" element={<CategoryEdit type='category' />}></Route>
                    </Route>

                    <Route path="user" element={<UserPage />}>
                        <Route path="create" element={<UserCreate />}></Route>
                        <Route index element={<UserList type='user' />}></Route>
                        <Route path=":id/edit" element={<UserEdit type='user' />}></Route>
                    </Route>

                    <Route path="product" element={<ProductPage />}>
                        <Route path="create" element={<ProductCreate />}></Route>
                        <Route index element={<ProductList />}></Route>
                        <Route path=":id/edit" element={<ProductEdit />}></Route>
                    </Route>
                </Route>
            </Routes>



        </BrowserRouter>
    )
}

export default Routing