import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/general.css'
import { Login } from '../pages/Login';


export const Navigation = ( {loginState, setLoginState }) => {

    const handleLogout = () => {

        if (loginState) {
            console.log("LOGGING OUT")
            localStorage.removeItem('Id')
            localStorage.removeItem('username')
            setLoginState(false)
        }


    }

    return (
        
        
        <Navbar bg="light" expand="lg" id="navElement" className="border-bottom border-2 fixed-top">
            <Container >
                
                <Navbar.Brand href="#home" className="brand-font-size">PantryPal</Navbar.Brand>
                
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-font-size">
                        <LinkContainer to='/grocery'>
                            <Nav.Link className="nav-link-custom">GroceryList</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/recipes'>
                            <Nav.Link className="nav-link-custom">Recipes</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/ingredients'>
                            <Nav.Link className="nav-link-custom">Ingredients</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/meals'>
                            <Nav.Link className="nav-link-custom">Meal Plans</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="nav-font-size">

                        <LinkContainer to='/'>

                            <Nav.Link onClick={handleLogout}>{loginState ? "SignOut" : "Login"}</Nav.Link>

                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
        

    )

}