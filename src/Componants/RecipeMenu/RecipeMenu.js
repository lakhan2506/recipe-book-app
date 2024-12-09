import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './RecipeMenu.css'

const RecipeMenu = ({ searchQuery,selectedCategory }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState('')

    useEffect(() => {
        async function fetchRecipes() {
            try {
                setLoading(true);
                setError('');
                const response = await fetch('https://api.spoonacular.com/recipes/random?number=100&apiKey=61d6ed252e06406f8df1d516b15c81d0');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                if (!data.recipes || data.recipes.length === 0) {
                    throw new Error('No recipes found. Try refreshing the page.');
                }
                setRecipes(data.recipes);
                setFilteredRecipes(data.recipes);
            } catch (error) {
                setError(error.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [])

    useEffect(() => {
        let filtered = recipes;
        if (selectedCategory === 'vegetarian') {
            filtered = filtered.filter((recipe) => recipe.vegetarian);
        } else if (selectedCategory === 'non-vegetarian') {
            filtered = filtered.filter((recipe) => !recipe.vegetarian);
        }
        if (searchQuery.trim() === '') {
            setFilteredRecipes(recipes);
        } else {
            filtered = recipes.filter((recipe) => {
                const hasBeef = recipe.extendedIngredients?.some((ingredient) =>
                    ingredient.name.toLowerCase().includes('beef')
                );
                const titleMatch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
                const ingredientsMatch = recipe.extendedIngredients?.some((ingredient) =>
                    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return titleMatch || ingredientsMatch || !hasBeef;
            });
        }
        setFilteredRecipes(filtered);
        setCurrentPage(1);
    }, [searchQuery,selectedCategory, recipes]);


    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const currentItems = filteredRecipes.slice(start, end);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(filteredRecipes.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (error) {
        return (
            <div className="error-message">
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="menu-container">
            <h1>Recipes</h1>
            {loading ? (
                <div className="loading">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="menu-list">
                    {currentItems.map((item, index) => (
                        <div key={item.id} className="menu-item">
                            <h2>
                            <Link className='recipe-link' to={`/recipe/${item.id}`}>{start + index + 1}. {item.title || 'No Title Available'}</Link>
                            </h2>
                            {item.dishTypes && item.dishTypes.length > 0 && (
                                <div className="dish-types">
                                    <span>Dish Type : {item.dishTypes.join(', ')}</span>
                                </div>
                            )}
                            {item.diets && item.diets.length > 0 && (
                                <div className="diets">
                                    <span>Diets : {item.diets.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={end >= filteredRecipes.length}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecipeMenu;