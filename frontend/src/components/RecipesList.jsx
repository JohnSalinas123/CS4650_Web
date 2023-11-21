import React from 'react';

export const RecipesList = () => {
	const [recipes, setRecipes] = useState()

	useEffect(() => {
		// function is called after rendering map
		getData();
	}, []); // end useEffect

	const getData = async () => {
		try {
			const { data } = await axios.get('api/recipes');
			data.forEach((recipe) => {
				// for loop inserts each event into array
				setEvents((prevRecipe) => [...prevRecipe, recipe]); // add new event to end of array
			});
			console.log(recipes);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='container'>
			<h3 className='p-3 text-center'>Recipe List</h3>
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Ingredients</th>
					</tr>
				</thead>
				<tbody>
					{recipes &&
						recipes.map((recipe) => (
							<tr key={recipe._id}>
								<td>{recipe.name}</td>
								<td>{recipe.description}</td>
								<td>{recipe.ingredients}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};