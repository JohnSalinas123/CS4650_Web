import React, {useState} from 'react';
import axios from 'axios';
import '../styles/ingredient.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';

export const IngredientForm = (props) => {
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientCategory, setIngredientCate] = useState('Carbohydrate');
    const [ingredientCalories, setIngredientCal] = useState('');    

    
    const handleSubmit =  async () => {
        const {data} = await axios.post('api/ingredients',{
            name: ingredientName,
            category: ingredientCategory,
            calories: ingredientCalories
        });
        console.log(data);
        handleCloseForm();
    };
    const saveInput = (event) => {
		const eventField = event.target.id;

		switch (eventField) {
			case 'ingredientName': 
				setIngredientName(event.target.value);
				break;
			case 'ingredientCategory':
				setIngredientCate(event.target.value);
                break;
            case 'ingredientCalories':
                setIngredientCal(event.target.value)
				break;
			default:
				console.log('Error: no such field');
		}  
	};


    const handleSelect = (event) =>{
        setIngredientCate(event.target.value);
    };
    return (
        <Modal size="lg" centered show={props.show} onHide={props.handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Add New Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Form style={{maxWidth: '200px', margin: 'auto' }}>
                    <Col>
                        <Form.Group className='mb-3' controlId='ingredientName' onChange={saveInput}>
                            <Form.Label> Name </Form.Label>
                            <Form.Control placeholder='Ex: Bagel' />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='ingredientCategory' onChange={saveInput}>
                            <Form.Label> Category </Form.Label>
                            <Form.Select value={ingredientCategory} onChange={handleSelect}>
                                <option value="Carbohydrate">Carbohydrate</option>
                                <option value="Protein">Protein</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Fat">Fat</option>
                                <option value="Fruit">Fruit</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb-3' controlId='ingredientCalories' onChange={saveInput}>
                            <Form.Label> Calories </Form.Label>
                            <Form.Control placeholder='Ex: 245' />
                        </Form.Group>
                    </Col>
                    <Modal.Footer>
                        <Button type="submit" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
        
        </Modal>
    );
};
