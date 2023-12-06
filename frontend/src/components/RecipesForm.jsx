import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import '../styles/recipe.css'


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

    const [recipeSteps, setRecipeSteps] = useState([
        {
            "step_num" : 1,
            "instructions": ""
        }
    ]);

    const [recipeStepsCount, setRecipeStepsCount] = useState(1);

    const saveInput = (event) => {
		// save input in field
		const eventField = event.target.id;

		switch (eventField) {
			case 'recipeName': // uses control ID
				setRecipeName(event.target.value);
                console.log(recipeName)
				break;
			case 'recipeDescrip':
				setRecipeDescrip(event.target.value);
                console.log(recipeDescrip)
            case 'recipeCalories':
                setRecipeCal(event.target.value)
                console.log(recipeCal)
				break;
			case 'recipeDiet':
				setRecipeDiet(event.target.value);
                console.log(recipeDiet)
				break;
			default:
				console.log('Error: no specified field found');
		};

        
        
        
        

	}; 


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

    const handleIngredientChange = (index, field, value) => {
        setRecipeIngreds((prevIngreds) => {
          const updatedIngredients = [...prevIngreds];
          updatedIngredients[index][field] = value;
          return updatedIngredients;
        });
        console.log(recipeIngreds)
      };

    const handleSubmit = async () => {

        const { data } = await axios.post('api/recipes',
		{
			name: recipeName,
			description: recipeDescrip,
			calories: recipeCal,
            diet: recipeDiet,
            ingredients: recipeIngreds,
            steps: recipeSteps

		});

        console.log("SUBMIT")
        //props.handleClose
    }

    // render ingredient rows
    const renderIngredientRows = () => {
        return recipeIngreds.map((ingredient, index) => (
            
                <Row key={index} className="recipe-ingred-row align-items-center">
                    <Col xs={1} className="text-center">
                        
                            {ingredient.index}.
                        
                    </Col>
                    <Col xs={5}>
                        <Form.Control 
                            name={`ingredients[${index}].name`} 
                            placeholder="Name"  
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            />
                    </Col>
                    <Col>
                    <Form.Control 
                        name={`ingredients[${index}].quantity`} 
                        placeholder="Quantity"  
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        />

                    </Col>
                    <Col>
                        <Form.Select 
                            name={`ingredients[${index}].unit`} 
                            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                            >
                            <option>grams</option>
                            <option>ml</option>
                            <option>cups</option>
                            <option>oz</option>
                        </Form.Select>
                    </Col>    
                </Row>
            
        ));

    }


    const addStepRow = () => {

        let stepCount = recipeStepsCount + 1

        setRecipeStepsCount(stepCount)

        const newStepRow = {
            step_num: stepCount,
            instructions : ""

        }
        setRecipeSteps((prevSteps) => [...prevSteps, newStepRow]);
        console.log(recipeSteps)
    }

    const handleStepsChange = (index, field, value) => {
        setRecipeSteps((prevSteps) => {
          const updatedSteps = [...prevSteps];
          updatedSteps[index][field] = value;
          return updatedSteps;
        });
        console.log(recipeSteps)
      };

    // render ingredient rows
    const renderStepRows = () => {
        return recipeSteps.map((step, index) => (
            
                <Row key={index} className="recipe-ingred-row align-items-center">
                    <Col xs={1} className="text-center">
                        
                            {step.step_num}.
                        
                    </Col>
                    <Col>
                        <Form.Control 
                            name={`steps[${index}].instructions`} 
                            as="textarea"
                            placeholder="Recipe instructions..."  
                            onChange={(e) => handleStepsChange(index, 'instructions', e.target.value)}
                            />
                    </Col>
                    
                </Row>
            
        ));

    }


    return (
            <Modal size="lg" centered show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create a new recipe!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='fw-bold'>
                        <Row>
                            <Col>
                                <Form.Group className='mb-3' controlId='recipeName'>
                                    <Form.Label> Name </Form.Label>
                                    <Form.Control 
                                        placeholder='Ex: Pepperoni Pizza' 
                                        onChange={saveInput}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='recipeCalories'>
                                    <Form.Label> Calories </Form.Label>
                                    <Form.Control 
                                        placeholder='Ex. 500' 
                                        onChange={saveInput}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className='mb-3' controlId='recipeDiet'>
                                    <Form.Label> Diet </Form.Label>
                                    <Form.Select 
                                        defaultValue="Diet..."
                                        onChange={saveInput} 
                                        >
                                        <option>Omnivore</option>
                                        <option>Vegetarian</option>
                                        <option>Vegan</option>
                                        <option>Keto</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                        </Row>

                        <Form.Group className='mb-3' controlId='recipeDescrip'>
                            <Form.Label> Description </Form.Label>
                            <Form.Control 
                                as='textarea' 
                                rows={2} 
                                onChange={saveInput}
                                />
                        </Form.Group>
                        
                        <Form.Group className='mb-3' controlId='recipeIngredients'>
                            <Form.Label> Ingredients </Form.Label>
                            {renderIngredientRows()}
                            <Row>
                                <Col className="d-grid">
                                    <Button  onClick={addIngredientRow}>Add Another Ingredient</Button>
                                </Col>
                            </Row>    
                            
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='recipeSteps'>
                            <Form.Label> Instructions </Form.Label>

                            {renderStepRows()}
                            <Row>
                                <Col className="d-grid">
                                    <Button  onClick={addStepRow}>Add Another Instruction</Button>
                                </Col>
                            </Row>   

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
        </Modal>
    )

}