import React from 'react'
import { GlobalState } from './Context'
import { Loading } from './loading'

const PopularCity = () => {
    const { popularCity } = GlobalState()
    
    return (
        <>
            <div className='container'>
                <h1 className=" text-center mb-4">Popular City's Weather</h1>
                <div className="table-responsive">
                    {popularCity && popularCity.length === 0 ? <Loading /> :
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th style={{ width: "34%" }}></th>
                                    <th style={{ width: "22%" }}>Temperature</th>
                                    <th style={{ width: "22%" }}>Humidity</th>
                                    <th style={{ width: "22%" }}>Wind</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popularCity.map((i, index) => (
                                    <tr key={index}>
                                        <th scope="row" className="text-start">{i.city}</th>
                                        <td>{i.data.temp} °C</td>
                                        <td>{i.data.humidity} %</td>
                                        <td>{i.data.wind_speed} km/h</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default PopularCity