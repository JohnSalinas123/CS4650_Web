import Accordion from 'react-bootstrap/Accordion'
import "../styles/recipe.css"

export const RecipeListItem = (props) => {

    console.log(props.id)

    return (
      <Accordion defaultActiveKey={null} className="recipe-item-container">
        <Accordion.Item eventKey={props._id}>
        <Accordion.Header>
            <div>
                <p>{props.name}</p>
                <p>{props.description}</p>
            </div>
        </Accordion.Header>
        <Accordion.Body>
          {ingredientsToString(props.ingredients)}
          {props.steps.map((step) => (
										<div key={step.step_num}>
											{`${step.step_num}. ${step.instruction}`}
										</div>
									))}
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
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