import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import '../styles/recipe.css'


const RecipeIngredientRow = (props) => {

    return (
        <div>

        </div>
    )

}


export const RecipeForm = (props) => {
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescrip, setRecipeDescrip] = useState('');
    const [recipeCal, setRecipeCal] = useState('');
    const [recipeDiet, setRecipeDiet] = useState('');
    const [recipeIngreds, setRecipeIngreds] = useState([
        {
            "index": 1,
            "name": "",
            "quantity": "",
            "unit" : "grams"
        }
    ]);
    const [recipeIngredsCount, setRecipeIngredsCount] = useState(1);
    const [recipeSteps, setRecipeSteps] = useState([]);

    axios.defaults.baseURL = 'http://localhost:8080/';

    // get ingredients for multi-select form field
    useEffect(() => {
        try{
          const {ingredientArr} = axios.get('api/ingredients')
          .then(response => setIngredients(response.data))
          .catch(error => console.error(error));
      
        }catch(err){
          console.error(err);
        }
      }, []);

    const addIngredientRow = () => {

        let recipeCount = recipeIngredsCount + 1

        setRecipeIngredsCount(recipeCount)

        const newIngredientRow = {
            index: recipeCount,
            name: "",
            quantity: "",
            unit: "grams"

        }
        setRecipeIngreds((prevIngreds) => [...prevIngreds, newIngredientRow]);
        console.log(recipeIngreds)
    }

    const renderIngredientRows = () => {
        console.log("ADD INGREDIENT ROW")
        return recipeIngreds.map((ingredient, index) => (
            <div>
                <Row key={index} className="recipe-ingred-row">
                    <Col xs={1} className="text-center">
                        
                            {ingredient.index}.
        
                    </Col>
                    <Col xs={5}>
                        <Form.Control placeholder="Name" default={ingredient.name} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Quantity" value={ingredient.quantity}/>
                    </Col>
                    <Col>
                        <Form.Select defaultValue="Diet..." value={ingredient.unit}>
                            <option>ml</option>
                            <option>grams</option>
                            <option>cups</option>
                            <option>oz</option>
                        </Form.Select>
                    </Col>    
                </Row>
            </div>
        ));

    }

    const saveInput = (event) => {
		// save input in field
		const eventField = event.target.id;

		switch (eventField) {
			case 'recipeName': // uses control ID
				setRecipeName(event.target.value);
				break;
			case 'recipeDescrip':
				setRecipeDescrip(event.target.value);
            case 'recipeCalories':
                setRecipeCal(event.target.value)
				break;
			case 'recipeDiet':
				setRecipeDiet(event.target.value);
				break;
			default:
				console.log('Error: no specified field found');
		} // end switch
	}; // end saveInput const

    return (
            <Modal size="lg" centered show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create a new recipe!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='recipeName' onChange={saveInput}>
                                    <Form.Label> Name </Form.Label>
                                    <Form.Control placeholder='Ex: Pepperoni Pizza' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='recipeCalories' onChange={saveInput}>
                                    <Form.Label> Calories </Form.Label>
                                    <Form.Control placeholder='Ex. 500' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='recipeDiet' onChange={saveInput}>
                                    <Form.Label> Diet </Form.Label>
                                    <Form.Select defaultValue="Diet...">
                                        <option>Omnivore</option>
                                        <option>Vegetarian</option>
                                        <option>Vegan</option>
                                        <option>Keto</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Form.Group className='mb-3' controlId='recipeDescrip' onChange={saveInput}>
                            <Form.Label> Description </Form.Label>
                            <Form.Control as='textarea' rows={2} />
                        </Form.Group>
                        
                        <Form.Group className='mb-3' controlId='recipeIngredients' onChange={saveInput}>
                            <Form.Label> Ingredients </Form.Label>
                            <Form>
                                {renderIngredientRows()}
                                <Row>
                                    <Col className="d-grid">
                                        <Button  onClick={addIngredientRow}>Add</Button>
                                    </Col>
                                </Row>    
                            </Form>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='recipeSteps' onChange={saveInput}>
                            <Form.Label> Steps </Form.Label>
                            <Form.Control as='textarea' rows={2} />
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