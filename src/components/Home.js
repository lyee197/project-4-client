import IndexEvents from "./events/IndexEvents"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<h3>We finally got here</h3>
			<IndexEvents msgAlert={props.msgAlert} />
		</>
	)
}

export default Home
