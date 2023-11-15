import InputSubmit from '@/components/InputSubmit'
import NextFive from '@/components/NextFive'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';


export default function Home() {

  const [data, setData] = useState<{
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
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<string | null>(null);
  const [dataForFiveDays, setDataForFiveDays] = useState<{
    list: {
      main: {
        temp: number;
      };
      weather: {
        icon: string
      }[];
      dt_txt: string;
    }[];
  } | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const foundDates: string[] = [new Date().toLocaleString('lt').split(' ')[0]];

  useEffect(() => {

    // Fetching Present Weather Only
    const fetchWeatherData = async () => {
      try {
        if (lat !== null && lon !== null) {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`); 
          setData(response.data);
        }
        setLoading(false);
      } catch (error:any) {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      }
    };

    // Fetching Weather Data for the next five days
    const fetchWeatherDataForFiveDays = async () => {
      try {
        if (lat !== null && lon !== null) {
          const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`); 

          // Extract only the required fields from the response
          const extractedData = response.data.list.reduce((accumulator: any[], item: any) => {
            const date_txt = item.dt_txt.split(' ')[0];
            if (!foundDates.includes(date_txt)) {
              foundDates.push(date_txt);
              const formattedDate = moment(date_txt).format('ddd'); // To get the day in words
              const icon = item.weather[0].icon; // To Access the first element of the array
              accumulator.push({
                main: {
                  temp: item.main.temp,
                },
                weather: {
                  icon: icon
                },
                dt_txt: formattedDate,
              });
            }
            return accumulator;
          }, []);

          setDataForFiveDays({ list: extractedData });
        }
        setLoading(false);
      } catch (error:any) {
        setError('Error fetching data: ' + error.message);
        setLoading(false);
      }
    };

    const getLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json');
        const { latitude, longitude } = response.data; // Adjust this based on the actual structure of the API response
        setLat(latitude);
        setLon(longitude);
        setLocation(response.data);
        setLoading(false);
      } catch (error: any) {
        setError('Error getting location: ' + error.message);
        setLoading(false);
      }
    };

    getLocation();
    fetchWeatherDataForFiveDays();
    fetchWeatherData();
  }, [lat, lon]); 
  

  if (loading) {
    return <div className={`text-center text-black text-4xl`}>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const first5 = [];

  for (let i = 0; i < dataForFiveDays?.list?.length; i++) {
    const obj = dataForFiveDays?.list[i];
    const date_txt = obj.dt_txt.split(" ")[0];
    if (!foundDates.includes(date_txt)) {
      foundDates.push(date_txt);
      first5.push(obj);
    }
  }



  return (
    <main className={`flex items-center justify-center p-10 flex-col overflow-hidden`}>
      <InputSubmit data={data} setData={setData} />
      <NextFive data={dataForFiveDays} setData={setDataForFiveDays} />
    </main>
  )
}
