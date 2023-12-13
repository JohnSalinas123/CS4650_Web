import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GroceryList.css'; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Checkbox, Radio, Switch } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

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

  /*
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
  */

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

  const handleAddGroceryItem = async () => {

    const { data } = await axios.post('api/user/grocery', 
      {
        user_id: localStorage.getItem("Id"),
        newGroceryItem: {
          name: newGroceryItemName,
          quantity: newGroceryItemQuantity,
          active: false,
        }
      });

      console.log(data)

      setGroceryItems((prevGroceryItem) => [
        ...prevGroceryItem,
        {
          _id: data._id,
          name: data.name,
          quantity: data.quantity,
          active: false,
        }
      ])

      console.log("NEW GROCERY ITEM CREATED")

  }

  const handleCheckClick =  async (ingredientID, ingredientActive) => {
    console.log(`Checkbox was ${ingredientActive}, attempting to change to ${!ingredientActive}`)
    try {

      const { data } = await axios.put('/api/user/grocery', {
          user_id: localStorage.getItem('Id'),
          item_id: ingredientID,
          active: !ingredientActive,
      })

      console.log("CHECKBOX UPDATE DATA")
      console.log(data)

      setGroceryItems((prevGroceryItems) => 
        prevGroceryItems.map((ingredient) => 
          ingredient._id === ingredientID ? {
            ...ingredient, active: data.active } : ingredient
        )
      );

      console.log(groceryItems)


    } catch (error) {
        console.log("Error changing state of ingredient checkbox")
    }
    
    console.log(ingredientActive)

  }

  const handleClearGroceryItems = async () => {

    console.log("CLEARING GROCERY LIST")

    const {data} = await axios.delete(`/api/user/grocery/${localStorage.getItem('Id')}`)

    setGroceryItems(data.ingredients)

  }



  return (
    <div className="grocery-list-container">
      <Row className="justify-content-md-center p-3">
				<Col xs lg="2">
				</Col>
				<Col md="auto">
					<h2 >Grocery List</h2>
				</Col>
				<Col xs lg="2">
					<Button className="grocery-list-clear-button" onClick={handleClearGroceryItems}>
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
                        placeholder='Ex: 5 lb' 
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
              <Row key={ingredient._id}>
                  <Col className="text-center">
                    <p>{ingredient.name}</p>
                  </Col>
                  <Col className="text-center">
                    <p className="quantity-box">  {ingredient.quantity}</p>
                  </Col>
                  <Col>
                    <Checkbox bigger shape="round" variant="fill" defaultChecked={ingredient.active} onChange={() => handleCheckClick(ingredient._id, ingredient.active)} color={"success"}>
                    </Checkbox>
                  </Col>
                  
              </Row>
            ))}
          </ul>
        </div>
        )
    }


export default GroceryList;




