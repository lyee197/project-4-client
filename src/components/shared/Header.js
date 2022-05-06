import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='addEvent' style={linkStyle}>
				Add New Event
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='/events' style={linkStyle}>
				Events
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='addPet' style={linkStyle}>
				Add New Pet
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='/pets' style={linkStyle}>
				Pets
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='/users' style={linkStyle}>
				Users
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar className='navB' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                Pet Play Date
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
