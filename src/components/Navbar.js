import React from 'react'
import { GlobalState } from './Context'
import SearchBar from './SearchBar'

const Navbar = () => {
  const { chooseCity, getLocation, DetectMe } = GlobalState()
  const { city, state, country } = DetectMe
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">iWeather</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/"> </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Popular City
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { chooseCity('kolkata') }}>Kolkata</li>
                  <li className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { chooseCity('Delhi') }}>Delhi</li>
                  <li className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { chooseCity('Mumbai') }} >Mumbai</li>
                </ul>
              </li>
              <li className="nav-item ">
                {DetectMe.length === 0 ?
                  <span className="nav-link" style={{ cursor: "pointer" }} onClick={() => getLocation()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width="1rem" className='me-2' viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg> Detect Location</span>
                  : city !== undefined ? <span className='nav-link fw-bold' style={{ cursor: "pointer" }} onClick={() => chooseCity(city)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-success me-2' fill="currentColor" height="2rem" width="1rem" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg> {city},{state},{country}</span> : <span className='text-danger nav-link'> <svg xmlns="http://www.w3.org/2000/svg" height="2rem" width='1rem' fill="currentColor" className='me-2' viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
                    Something Error </span>
                }
              </li>
            </ul>
            <div className='d-none d-lg-block' style={{ width: '60%' }}>
              <SearchBar />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;