/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const globalContext = createContext()

const Context = ({ children }) => {
    const PopularCities = ['Kolkata', 'London', 'France', 'Africa', 'Canada', 'Dubai'];

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    const apiExtra = {
        method: 'GET',
        params: {
            'accept-language': 'en',
            polygon_threshold: '0.0'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
        }
    };

    const initialState = {
        city: "Kolkata",
        Data: [],
        isLoading: false,
        popularCity: [],
        DetectMe: []
    }
    const Reducer = (state, action) => {
        switch (action.type) {
            case "LOADING_STATE":
                return { ...state, isLoading: true }
            case "END_LOADING_STATE":
                return { ...state, isLoading: false }
            case "FETCH_DATA":
                return { ...state, Data: action.payload }
            case "POPULAR_CITY_DATA":
                return { ...state, popularCity: action.payload }
            case "SET_CITY":
                if (action.payload !== undefined) {
                    return { ...state, city: action.payload }
                } else {
                    return { ...state, city: "kolkata" }
                }
            case "DETECT_ME":
                return { ...state, DetectMe: action.payload }
            default:
                return state;
        };
    }
    const [state, dispatch] = useReducer(Reducer, initialState)

    const locateMe = async (lat, lon) => {
        let url = "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse"

        try {
            let response = await axios.get(`${url}?lat=${lat}&lon=${lon}`, apiExtra)
            dispatch({ type: "SET_CITY", payload: response.data.address.city });
            dispatch({ type: "DETECT_ME", payload: response.data.address });
        } catch (error) {
            console.error(error);
        }
    }

    let fetchApi = async (city) => {
        let url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather'
        dispatch({ type: 'LOADING_STATE' });
        try {
            let data = await axios.get(`${url}?city=${city}`, options)
            dispatch({ type: 'END_LOADING_STATE' });
            return data.data
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    useEffect(() => {
        fetchApi(state.city)
            .then((data) => {
                if (data) {
                    dispatch({ type: 'FETCH_DATA', payload: data });
                }
            });
    }, [state.city])

    const fetchPopularCityData = async () => {
        const requests = PopularCities.map(async (city) => {
            const data = await fetchApi(city)
            return { city, data }
        });
        const responses = await Promise.all(requests);
        dispatch({ type: "POPULAR_CITY_DATA", payload: responses.filter(Boolean) });
    };

    useEffect(() => {
        fetchPopularCityData();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    locateMe(latitude, longitude)
                },
                (error) => {
                    console.error('Error occurred while retrieving location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    useEffect(() => {
        getLocation()
    }, [])

    const searchCity = (e) => {
        e.preventDefault();
        dispatch({ type: "SET_CITY", payload: e.target.elements.cityName.value })
    }

    const chooseCity = (e) => {
        dispatch({ type: "SET_CITY", payload: e })
    }

    return (
        <globalContext.Provider value={{ ...state, searchCity, chooseCity, getLocation }}>
            {children}
        </globalContext.Provider>
    )
}

export const GlobalState = () => {
    return useContext(globalContext)
}
export default Context