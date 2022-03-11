import React from 'react';
import '../Search/Search.css';

function Search() {
    return (
        <div id="search-input-container">
            <form action="">
            <label for="searchTerm" id="searchBoxLabel">Search</label>
            <input name="searchTerm" type="text" id="searchTerm" placeholder="Search NewLife Hospital" autocomplete="off" />
            <input type="submit" name="search" value="Search" id="search" />
            </form>
        </div>
    )
}

export default Search;