import React, { useEffect } from 'react'
import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Row, Container } from 'react-bootstrap'
// import Header from '../../../components/header/header'
import InputComponent from '../../../components/common/inputComponent/InputComponent'
import CustomFormLabel from '../../../components/common/labelcomponent/CustomFormLabel'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/auth'
import { NavLink } from 'react-router-dom'
import "./indexlogin.css"

const LoginPage = () => {

  // //state hook
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();

  let navigate = useNavigate();

  // //state hook
  // useEffect(() => {
  //   //on every state update this block executes
  // });

  // useEffect(() => {
  //   //on very first call this block executes
  //   setUsername("Bishnu")
  //   setPassword("12345")
  // }, []);

  // useEffect(() => {
  //   //on every username state change
  // }, [username, password]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      let response = await login(username, password)
      // let response = await httpPOst('login', {
      //   email: username,
      //   password: password
      // });
      // console.log("I am in login: ", response)
      // let token = response.result.token;
      // let user = response.result.user;
      // let storage_user = {
      //   name: user.name,
      //   email: user.email,
      //   role: user.role
      // }
      // localStorage.setItem("login_token", token);
      // localStorage.setItem('login_user_info', JSON.stringify(storage_user));
      navigate('/admin');
      toast.success(response.result.msg)
    } catch (error) {
      //todo: handle login error
      toast.error(error.msg);
    }

    //post request=> http://localhost:3001/api/v1/login
    // axios.post("https://sandeshapi.herokuapp.com/auth/login", {
    //   email: username,
    //   password: password
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       // console.log(response)
    //       if (response.data.status) {
    //         //success
    //         let token = response.data.result.token;
    //         localStorage.setItem("login_token", token);
    //         navigate('/admin');

    //         toast.success(response.data.msg)
    //       } else {
    //         toast.error(response.data.msg);
    //       }
    //     } else {
    //       toast.error(response.data.msg)
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error)
    //     toast.error(error.message);
    //   })

  }

  useEffect(() => {
    let token = localStorage.getItem("login_token");
    if (token) {
      navigate("/admin");
    }
  }, []);


  return (
    <>
      <ToastContainer />
      
      <Container className='mt-3'>
        <Row>
          <Col sm={9}>
            <h1 className='text-center fs-3'>Login to your Account</h1>
            <hr/>
            <form onSubmit={submitForm}>
              <div className="form-group row mb-4">
                <CustomFormLabel
                  title='Email'
                  isRequired={true}
                />

                <div className='col-sm-9'>
                  <InputComponent
                    type="email"
                    name="email"
                    required={true}
                    placeholder="Enter your email"
                    handleChange={setUsername}
                  />

                </div>
              </div>
              <div className="form-group row mb-4">
                <CustomFormLabel
                  title="Password"
                  isRequired={true}
                />

                <div className='col-sm-9'>
                  <InputComponent
                    type="password"
                    name="password"
                    required={true}
                    placeholder="Enter your password"
                    handleChange={setPassword}
                  />

                </div>
              </div>

              <div className="form-group row mb-3">
                <div className="offset-sm-3 col-sm-9">
                  <label htmlFor='remember_me'>
                    <input type="checkbox" id="remember_me" name="remember_me" value="1"></input> Remember Me
                  </label>
                </div>
              </div>

              <div className="form-group row mb-3">
                <div className="offset-sm-3 col-sm-9">
                  <button className='btn btn-sm btn-danger mx-3' type="reset">
                    Reset
                  </button>
                  <button className='btn btn-sm btn-success' type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div id='reg_link'>
              <div id="para_style">
                <p>Don't Have an Account?</p>
              </div>
              <NavLink className="nav-link" to="/register" >Register here</NavLink>

            </div>


          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage