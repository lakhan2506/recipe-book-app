import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import Navbar from './Componants/Navbar/Navbar';
import Breadcrumb from './Componants/Breadcrumb/Breadcrumb';
import RecipeMenu from './Componants/RecipeMenu/RecipeMenu';
import FoodCategoryFilter from './Componants/FoodCategory/FoodCategoryFilter';
import RecipeDetails from './Componants/RecipeDetails/RecipeDetails';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const Layout = ({ children }) => {
    const location = useLocation();
    const showFilters = location.pathname === '/'; // Show filters only on the home page

    return (
      <>
        {showFilters && <Navbar onSearch={handleSearch} />}
        <Breadcrumb />
        {showFilters && (
          <FoodCategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}
        {children}
      </>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<RecipeMenu selectedCategory={selectedCategory} searchQuery={searchQuery} />}
          />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
