import React  from 'react'
import { Navigate } from 'react-router-dom';

const AdminPrivateRoutes = ({component}) => {
    //API => login => token => valid => true, false
    let token = localStorage.getItem('login_token');
    let is_logged_in = token ? true : false;
  return is_logged_in ? component : <Navigate to='/loginpage'></Navigate>
}

// }
export default AdminPrivateRoutes