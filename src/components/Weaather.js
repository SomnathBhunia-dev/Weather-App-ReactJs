import React from 'react'
import { GlobalState } from './Context'
import { Loading } from './loading'
import SearchBar from './SearchBar'


export const Weaather = () => {

  const { Data, city, isLoading } = GlobalState()

  let capitalizeFirstLetter = (cc) => {
    let string = cc.toString()
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className='container p-4' style={{ minHeight: '25rem' }}>
      <div className='d-lg-none mb-5'>
        <SearchBar />
      </div>
      {isLoading ?
        <Loading />
        :
        <>
          <h1 className="text-center mb-4">Today's Weather in {capitalizeFirstLetter(city)} <span id="cityName"></span></h1>
          <div className="container">
            <main>
              <div className="row row-cols-1 row-cols-md-3 mb-3 text-center align-items-center">
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm border-primary">
                    <div className="card-header py-3 text-bg-primary border-primary">
                      <h4 className="my-0 fw-normal">Wind</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">{Data.wind_speed} km/h</h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>Wind Degree : {Data.wind_degrees}</li>
                        <li>Wind Speed : {Data.wind_speed}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm border-warning">
                    <div className="card-header py-3 text-bg-warning border-warning">
                      <h4 className="my-0 fw-normal">Temperature</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">{Data.temp}°C</h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>Feels Like {Data.feels_like} °C<span id="temp"></span></li>
                        <li>Maximum Temparature is {Data.max_temp} °C<span id="cloud_pct"></span></li>
                        <li>Minimum Temparature is {Data.min_temp} °C<span id="feels_like"></span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm border-info">
                    <div className="card-header py-3 text-bg-info border-info">
                      <h4 className="my-0 fw-normal">Humidity</h4>
                    </div>
                    <div className="card-body">
                      <h1 className="card-title pricing-card-title">{Data.humidity} %</h1>
                      <ul className="list-unstyled mt-3 mb-4">
                        <li>Cloud PCT is {Data.cloud_pct}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      }
    </div>
  )
}
export default Weaather;
