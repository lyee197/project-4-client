import { Form, Container, Button } from 'react-bootstrap'

const PetForm = (props) => {
    
    const {pet, handleChange, handleSubmit, heading } = props
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                placeholder='What is your pets name?'
                value={pet.name}
                name="name"
                onChange={handleChange}
                />
                <Form.Label>Birthday</Form.Label>
                <br/>
                <input 
                    type="date" 
                    name="birthday"
                    value={pet.birthday}
                    onChange={handleChange}
                />
                <br/>
                <Form.Label>Animal Type</Form.Label>
                <Form.Select  aria-label="animal type" name="animalType" defaultValue={pet.animalType} onChange={handleChange}>
                    <option>Open this select menu</option>
                    <option value='dog'>dog</option>
                    <option value='cat'>cat</option>
                    <option value='rodent'>rodent</option>
                    <option value='fish'>fish</option>
                    <option value='bird'>bird</option>
                    <option value='other'>other</option>
                </Form.Select>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default PetForm