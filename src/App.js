// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import ShowEvent from './components/events/ShowEvent'
import IndexEvents from './components/events/IndexEvents'
import CreateEvent from './components/events/CreateEvent'
import IndexPets from './components/pets/IndexPets'
import CreatePet from './components/pets/CreatePet'
import ShowPet from './components/pets/ShowPet'
import IndexUsers from './components/users/IndexUsers'
import PetsToEvent from './components/events/PetsToEvent'

const App = (props) => {
    const [updated, setUpdated] = useState(false)
	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const {triggerRefresh} = props

	console.log('user in app', user)
	console.log('message alerts', msgAlerts)
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
					<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
					<RequireAuth user={user}>
						<ChangePassword msgAlert={msgAlert} user={user} />
					</RequireAuth>}
				/>
				<Route
					path='/events'
					element={<IndexEvents msgAlert={msgAlert} user={user} />}
				/>
				<Route 
					path='/addevent'
					element={
						<RequireAuth user={user}>
							<CreateEvent msgAlert={msgAlert} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/events/:id/addpets'
					element={<PetsToEvent msgAlert={msgAlert} user={user} triggerRefresh={() => setUpdated(prev => !prev)} />}
				/>
				<Route
					path='/events/:id'
					element={<ShowEvent msgAlert={msgAlert} user={user} />}
				/>
				<Route
					path='/pets'
					element={<IndexPets msgAlert={msgAlert} user={user} />}
				/>
				<Route 
					path='/addpet'
					element={
						<RequireAuth user={user}>
							<CreatePet msgAlert={msgAlert} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/pets/:id'
					element={<ShowPet msgAlert={msgAlert} user={user} />}
				/>
				<Route
					path='/users'
					element={<IndexUsers msgAlert={msgAlert} user={user} />}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App
