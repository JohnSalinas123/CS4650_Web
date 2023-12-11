import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GroceryList.css'; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

const GroceryList = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [groceryItemCounter, setGroceryItemCounter] = useState(1);

  const [newGroceryItemName, setNewGroceryItemName] = useState('');
  const [newGroceryItemQuantity, setNewGroceryItemQuantity] = useState();

  
  useEffect(() => {
    console.log(`GrocerList Loaded ->UserId: ${localStorage.getItem('Id')} UserName: ${localStorage.getItem('username')}`)

    if (localStorage.getItem('Id')) {
      fetchGroceryItems(localStorage.getItem('Id'));
    }

  }, []);

  // get all of users grocery list items
  const fetchGroceryItems = async (userId) => {
    console.log(`Fetching grocery items for ${localStorage.getItem('username')}`)

    try {

      const { data } = await axios.get(`api/user/grocery/${userId}`);
      console.log(data)
      data.forEach((groceryItem) => {
        setGroceryItems((prevGroceryItem) => [...prevGroceryItem, groceryItem]);
      })

    } catch (error) {
      console.error('Error fetching grocery items:', error);
    }
  };

  const updateGroceryList = async (itemId, ingredientId, newQuantity) => {
    console.log(groceryItems)
    try {
      const payload = { ingredient_id: ingredientId, quantity: newQuantity };
      await axios.put(`/api/user/grocery`, payload);




      // Update the state with the new quantity immediately
      setGroceryItems(groceryItems.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            ingredients: item.ingredients.map(ing => {
              if (ing.ingredient_id === ingredientId) {
                return { ...ing, quantity: newQuantity };
              }
              return ing;
            })
          };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error updating grocery list:', error);
    }
  };

  const handleQuantityChange = (itemId, itemName, change) => {
    console.log(groceryItems)



    /*
    const newGroceryItems = groceryItems.map(item => {
      if (item._id === itemId) {
        return {
          ...item,
          ingredients: item.ingredients.map(ingredient => {
            if (ingredient.ingredient_id === ingredientId) {
              const newQuantity = ingredient.quantity + change;
              if (newQuantity >= 0) {
                updateGroceryList(itemId, ingredientId, newQuantity);
                return { ...ingredient, quantity: newQuantity };
              }
            }
            return ingredient;
          })
        };
      }
      return item;
    
      
    });
    */
    // Update the local state to reflect the change immediately
    //setGroceryItems(newGroceryItems);
  };

  const saveInput = (event) => {
		// save input in field
		const eventField = event.target.id;

		switch (eventField) {
			case 'ingredientName': // uses control ID
				setNewGroceryItemName(event.target.value);
                console.log(newGroceryItemName)
				break;
			case 'ingredientQuantity':
				setNewGroceryItemQuantity(event.target.value);
                console.log(newGroceryItemQuantity)
                break;
			default:
				console.log('Error: no specified field found');
		};

	}; 

  /*
  const renderGroceryItems = () => {
    return groceryItems.map((groceryItem, index))
      
  }
  */

  const handleAddGroceryItem = () => {

    const { data } = axios.post('api/user/grocery', 
      {
        user_id: localStorage.getItem("Id"),
        newGroceryItem: {
          name: newGroceryItemName,
          quantity: newGroceryItemQuantity
        }
      });

      console.log(data)

      setGroceryItems((prevGroceryItem) => [
        ...prevGroceryItem,
        {
          name: newGroceryItemName,
          quanity: newGroceryItemQuantity
        }
      ])

      console.log("NEW GROCERY ITEM CREATED")

  }



  return (
    <div className="grocery-list-container">
      <Row className="justify-content-md-center p-3">
				<Col xs lg="2">
				</Col>
				<Col md="auto">
					<h2 >Recipe List</h2>
				</Col>
				<Col xs lg="2">
					<Button className="grocery-list-clear-button">
						Clear
					</Button>
				</Col>
				
			</Row>
      <div className="grocery-list-input pb-3">
        <Row>

          <Col>
              <Form.Group controlId='ingredientName'>
                  <Form.Label> Name </Form.Label>
                  <Form.Control 
                      placeholder='Ex: Potato' 
                      onChange={saveInput}/>
              </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='ingredientQuantity'>
                    <Form.Label> Quantity </Form.Label>
                    <Form.Control 
                        placeholder='Ex: 5' 
                        onChange={saveInput}/>
                </Form.Group>
            </Col>
            <Col xs lg="2" className="mt-auto">
              <Button className="align-middle grocery-list-add-button" onClick={handleAddGroceryItem}>
                Add
              </Button>
            </Col>

        </Row>
        
      </div>

          <ul>
            {groceryItems.map((ingredient) => (
              <li key={ingredient.ingredient_id} className="ingredient-item">
                {ingredient.name}
                <button onClick={() => handleQuantityChange(ingredient._id, ingredient.name, -1)}>-</button>
                <span className="quantity-box">{ingredient.quantity}</span>
                <button onClick={() => handleQuantityChange(ingredient._id, ingredient.name, 1)}>+</button>
              </li>
            ))}
          </ul>
        </div>
        )
    }


export default GroceryList;




