import React from 'react'
import { GlobalState } from './Context'


const SearchBar = () => {
    const { searchCity } = GlobalState()
    let handleClick = (e) => {
        return (e.target.value)
    }
    return (
        <>
            <form className="d-flex" role="search" onSubmit={searchCity}>
                <input id="cityName" className="form-control me-2" style={{ width: '80%' }} type="search" placeholder="Search" aria-label="Search" onChange={handleClick} />
                <button className="btn btn-outline-success" style={{ width: '20%' }} type="submit" id="submit">Search</button>
            </form>
        </>
    )
}

export default SearchBar