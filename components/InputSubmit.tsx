import React, { useEffect, useState } from 'react';
import PresentWeather from './PresentWeather';
import axios from 'axios'

interface InputSubmitProps {
    data: {
        name: string;
        sys:{
            country: string;
        };
        main: {
            pressure: number;
            humidity: number;
            temp: number;
        };
        coord: {
            lat: number;
            lon: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
    } | null;
    setData: React.Dispatch<React.SetStateAction<{
        name: string;
        sys:{
            country: string;
        };
        main: {
            pressure: number;
            humidity: number;
            temp: number;
        };
        coord: {
            lat: number;
            lon: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
    } | null>>;
}

const InputSubmit: React.FC<InputSubmitProps> = ({data, setData}) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const [searchCity, setSearchCity] = useState<string>('');
    
    const newSearchCity  = searchCity.toLowerCase();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${newSearchCity}&appid=${API_KEY}&units=metric`
            );

            setData(response.data);
        } catch (error:any) {
            console.error('Error fetching data: ', error.message);
            setData(null)
        }
    };

    useEffect(() => {
        if (searchCity)
            console.log(searchCity)
        else console.log(null);
    }, [])

    return (
        <>
        {
            data ?  (
        <>
            <div style={{ width: '60vw', height: '50px' }} className={`flex justify-center items-center mb-10`}>
                <form onSubmit={handleSubmit} className={`flex items-center justify-between w-full`}>
                    <input
                    type="text"
                    className={`w-full border h-12 border-black px-2 py-1 rounded-lg`}
                    placeholder='Enter location to search for a weather condition..'
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    />
                    <button type="submit"  className={`ml-2 bg-gray-300 text-black text-lg border border-black hover:bg-gray-500 w-28 h-12 rounded-lg`}>
                    Submit
                    </button>
                </form>
            </div>
            <PresentWeather data={data} setData={setData}/>
        </>
        ) : (
            <div className={`flex w-full h-full items-center justify-center bottom-5`}>
                <h1 className={`text-black text-4xl`}>No Present Weather Data.</h1>
            </div>
            )
        }
        </>
    );
};

export default InputSubmit;
