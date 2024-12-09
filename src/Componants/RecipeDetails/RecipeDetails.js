import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css'

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe id from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState('');

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        setLoading(true);
        setError('')
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=61d6ed252e06406f8df1d516b15c81d0`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className='loading-recipe'>Loading recipe details...</div>;
  }
  
  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <p>Please check your internet connection or try a different recipe.</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="error-message">
        <p>Recipe details could not be loaded.</p>
        <p>Try refreshing the page or returning to the menu.</p>
      </div>
    );
  }


  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>
              <span>{ingredient.name}</span> - {ingredient.amount} {ingredient.unit}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions || '<p>No instructions available.</p>' }} />
      </div>
    </div>
  );
};

export default RecipeDetails;