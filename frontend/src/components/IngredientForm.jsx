import React, {useState} from 'react';
import axios from 'axios';
import '../styles/ingredient.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';

import { createIngredients } from '../../../backend/controllers/createIngredient';

export const IngredientForm = (props) => {
    const [ingredientName, setRecipeName] = useState('');
    const [ingredientCategory, setRecipeDescrip] = useState('');
    const [ingredientCalories, setRecipeCal] = useState('');    

    const handleButtonClick = () => {
            setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const saveInput = (event) => {
		const eventField = event.target.id;

		switch (eventField) {
			case 'ingredientName': 
				setRecipeName(event.target.value);
				break;
			case 'ingredientCategory':
				setRecipeDescrip(event.target.value);
            case 'ingredientCalories':
                setRecipeCal(event.target.value)
				break;
			default:
				console.log('Error: no such field');
		}  
	};

    //createIngredients(saveInput);

    return (
        <Modal size="lg" centered show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Add New Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Form  show={props.show} onHide={props.handleClose} onSubmit={handleSubmit} style={{maxWidth: '200px', margin: 'auto' }}>
                    <Col>
                        <Form.Group className='mb-3' controlId='ingredientName' onChange={saveInput}>
                            <Form.Label> Name </Form.Label>
                            <Form.Control placeholder='Ex: Kiwi' />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='ingredientCategory' onChange={saveInput}>
                            <Form.Label> Category </Form.Label>
                            <Form.Control placeholder='Ex: Fruit' />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='ingredientCalories' onChange={saveInput}>
                            <Form.Label> Calories </Form.Label>
                            <Form.Control placeholder='Ex: 42' />
                        </Form.Group>
                    </Col>
                    <Modal.Footer>
                        <Button onClick={props.handleClose}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
        
        </Modal>
    );
};
