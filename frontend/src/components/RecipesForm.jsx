import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form'

export const RecipeForm = (props) => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescrip, setRecipeDescrip] = useState('');
    const [recipeCal, setRecipeCal] = useState('');
    const [recipeDiet, setRecipeDiet] = useState('');
    const [recipeIngreds, setRecipeIngreds] = useState([]);
    const [recipeSteps, setRecipeSteps] = useState([]);

    const saveInput = (event) => {
		// save input in field
		const eventField = event.target.id;

		switch (eventField) {
			case 'recipeName': // uses control ID
				setRecipeName(event.target.value);
				break;
			case 'recipeDescrip':
				setRecipeDescrip(event.target.value);
				break;
			case 'recipeDiet':
				setRecipeDiet(event.target.value);
				break;
			default:
				console.log('Error: no specified field found');
		} // end switch
	}; // end saveInput const

    return (
        <Modal centered show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create a new recipe!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='recipeName' onChange={saveInput}>
                        <Form.Label> Name </Form.Label>
                        <Form.Control placeholder='Ex: Pepperoni Pizza' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='recipeDescrip' onChange={saveInput}>
                        <Form.Label> Description </Form.Label>
                        <Form.Control as='textarea' rows={2} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='recipeDiet' onChange={saveInput}>
                        <Form.Label> Diet </Form.Label>
                        <Form.Select defaultValue="Diet...">
                            <option>Omnivore</option>
                            <option>Vegetarian</option>
                            <option>Vegan</option>
                            <option>Keto</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleClose}>
                    Save Recipe
                </Button>
            </Modal.Footer>
      </Modal>
    )

}