import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const isRecipeDetails = location.pathname.startsWith('/recipe/');

  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      <span>&gt;</span>
      {isRecipeDetails && (
          <span>Recipe Details</span>
      )}
    </nav>
  );
};

export default Breadcrumb;