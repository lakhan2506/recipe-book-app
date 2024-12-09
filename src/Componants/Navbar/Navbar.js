import React, { useState } from 'react'
import './Navbar.css'

const Navbar = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    }


    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className='logo'>RECIPE BOOK</div>
                <form onSubmit={handleSearchSubmit} className="form-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="form-control me-2 "
                        placeholder="Search recipe by Name or Ingredient"
                    />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;
