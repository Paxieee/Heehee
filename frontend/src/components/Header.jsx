import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import Logo from '../assets/Heehee_logo.png'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md " collapseOnSelect>
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} alt='Heehee logo'></img>
                    Heehee
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='cbasic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link href='/cart'><FaShoppingCart /> Cart</Nav.Link>
                        <Nav.Link href='/login'><FaUser /> Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header