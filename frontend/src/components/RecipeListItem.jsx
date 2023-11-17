import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import "../styles/recipe.css"
import "../styles/general.css"
import RecipeImage from "../resources/recipe_pixel_art.jpg"
import Col from "react-bootstrap/Col"

export const RecipeListItem = (props) => {

    console.log(props.id)

    return (
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card style={{ width: '18rem' }} className="recipe-item-container">
          <Card.Img className="recipe-image center" variant="top" src={RecipeImage} />
          <Card.Body className='recipe-body'>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.cal} cal</Card.Text>
            <Card.Text className="recipe-descrip d-flex flex-wrap">
              {props.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
}

const ingredientsToString = (ingredient_list) => {

	console.log(ingredient_list)

	let ingredient_array = []
	for (let i in ingredient_list) {
		ingredient_array.push(ingredient_list[i].name)

	}

	console.log(ingredient_array)

	return (
		<div>
			{ingredient_array.join(", ")}
		</div>
	)

}