import IndexEvents from "./events/IndexEvents"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<IndexEvents msgAlert={props.msgAlert} />
		</>
	)
}

export default Home
