import Image from 'next/image';
import React from 'react';

interface PresentWeatherProps {
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

const PresentWeather: React.FC<PresentWeatherProps> = ({data, setData}) => {
  return (
    <div
      style={{ width: '60vw', height: '60vh' }}
      className={`bg-white-300 mb-10 flex flex-col items-center justify-between md:flex-row rounded-md`}
    >
      <div className={`w-full md:w-1/2 h-1/4 md:h-full bg-white p-4 md:p-12 items-center justify-center m-2 flex rounded-lg`}>
        <div className={`w-full h-full flex bg-white- items-center justify-center`}>
          <Image width={300} height={100} objectFit='cover' src={`http://openweathermap.org/img/w/${data?.weather && data?.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      </div>
      <div className={`w-full md:w-1/2 h-3/4 md:h-full  bg-white items-center justify-between md:m-2 flex flex-col rounded-lg`}>
        <div className={`w-full h-2/6 md:h-1/6 bg-gray-300 rounded-lg items-center justify-center flex flex-wrap md:mb-0 mb-2`}>
          <h1 className={`text-black font-bold md:text-3xl max-w-full`}>{data?.name} , {data?.sys?.country}</h1>
        </div>
        <div style={{height: '76%'}} className={`w-full h-4/6 flex-row flex  justify-between p-1 items-center bg-gray-300`}>
          <div className={`w-1/2 md:w-1/2 h-full flex flex-col justify-between items-center bg-gray-300 flex-shrink-0`}>
            <div className={`flex flex-row items-start w-full h-1/4 bg-gray-300 flex-wrap`}>
              <h4 className={`md:text-lg text-black font-bold max-w-full max-h-full`}>Pressure: </h4>
              <h4 className={`md:text-lg ml-1  text-black font-normal`}>{data?.main?.pressure}hpa</h4>
            </div>
            <div className={`flex flex-row items-start w-full h-1/4 bg-gray-300 flex-wrap`}>
              <h4 className={`md:text-lg text-black font-bold max-w-full max-h-full`}>Humidity: </h4>
              <h4 className={`md:text-lg ml-1 text-black font-normal`}>{data?.main?.humidity}%</h4>
            </div>
            <div className={`flex flex-row items-start w-full h-1/4 bg-gray-300 flex-wrap`}>
              <h4 className={`md:text-lg text-black font-bold max-w-full max-h-full`}>Lat: </h4>
              <h4 className={`md:text-lg ml-1 text-black font-normal`}>{data?.coord?.lat}</h4>
            </div>
          </div>
          <div className={`w-1/2 md:w-1/2 h-full flex flex-col justify-between items-center bg-gray-300 flex-shrink-0`}>
            <div className={`flex flex-row items-start w-full h-1/4 bg-gray-300 flex-wrap`}>
              <h4 className={`md:text-lg text-black font-bold max-w-full max-h-full`}>Temp: </h4>
              <h4 className={`md:text-lg ml-1 text-black font-normal`}>{data?.main?.temp}°С</h4>
            </div>
            <div className={`flex flex-row items-start w-full h-1/4 bg-gray-300 flex-wrap`}>
              <h4 className={`md:text-lg text-black italic font-bold max-w-full max-h-full`}>{data?.weather && data?.weather[0]?.description}</h4>
            </div>
            <div className={`flex flex-row items-start w-full h-1/4 bg-gray-300 flex-wrap`}>
              <h4 className={`md:text-lg text-black font-bold max-w-full max-h-full`}>Lon: </h4>
              <h4 className={`md:text-lg ml-1 text-black font-normal`}>{data?.coord?.lon}</h4>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PresentWeather;
