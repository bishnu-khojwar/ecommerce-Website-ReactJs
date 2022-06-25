import React from 'react'
import { Navbar, Nav, Container, Form } from 'react-bootstrap'
import "./header.css"
import { BsCart, BsFillPersonFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';



const Header = () => {
    let is_logged_in = localStorage.getItem('login_token') ? true : false;
    let user = JSON.parse(localStorage.getItem('login_user_info'));
   
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container id='headerwidth'>
                    <Navbar.Brand to="/">Ecommerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/products">Products</NavLink>
                            <NavLink className="nav-link" to="/features">Features</NavLink>
                            <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                            <NavLink className="nav-link" to="/category">Category</NavLink>
                        </Nav>
                        <Form action='/search' >
                            <Form.Control 
                             type='search'
                              name='q' 
                              size='sm' 
                              placeholder='Search Here'>
                            </Form.Control>
                        </Form>
                        <Nav>
                            <Nav.Link href="/carts"><BsCart className="cart-icon" id='header-icon'></BsCart>Cart</Nav.Link>
                            {
                                (is_logged_in && user) ?
                                    <LoggedInComp user={user}/>
                                    :
                                    <AuthCompo />
                            }
                        </Nav>
                    </Navbar.Collapse>

                </Container>

            </Navbar>
        </>
    )
}
const AuthCompo = () => {
    return (
        <>
            <NavLink className="nav-link" to="/register">Register</NavLink>
            <NavLink className="nav-link" to="/loginpage"><BsFillPersonFill className="login-icon" id='header-icon'></BsFillPersonFill>Login</NavLink>
        </>
    )
}

const LoggedInComp = ({user}) => {
    // console.log("user: ", user)
    return (
        <>
            <NavLink className="nav-link" to={`/${user.role}`}><BsFillPersonFill className="login-icon" id='header-icon'></BsFillPersonFill>{user.name}</NavLink>
            
        </>
    )
}
export default Header