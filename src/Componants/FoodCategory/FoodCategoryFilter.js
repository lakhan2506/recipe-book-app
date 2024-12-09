import React from 'react';
import './FoodCategoryFilter.css';

const FoodCategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="category-filter">
            <label htmlFor="food-category">Filter by Category:</label>
            <select
                id="food-category"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="all">All</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
        </div>
    );
};

export default FoodCategoryFilter;