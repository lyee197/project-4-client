import { Form, Container, Button } from "react-bootstrap"

const EventForm = (props) => {
    const {event, handleChange, handleSubmit, heading } = props
    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="What is the Name for the Event?"
                    value={event.name}
                    name="name"
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Give this event a description"
                    value={event.description}
                    name="description"
                    onChange={handleChange}
                />
                <Form.Label>Date</Form.Label>
                <input 
                    type="date" 
                    name="date"
                    min="2022-04-01"
                    max="2023-04-01"
                    value={event.date}
                    onChange={handleChange}
                />
                <Form.Select  aria-label="event type" name="event_type" defaultValue={event.event_type} onChange={handleChange}>
                    <option>Open this select menu</option>
                    <option value="public">public</option>
                    <option value="private">private</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default EventForm