import Image from 'next/image';
import React from 'react'

interface NextFiveProps {
    data: {
        list: {
            main: {
                temp: number;
            };
            weather: {
                icon: string
            }[];
            dt_txt: string;
        }[];
    } | null;
    setData: React.Dispatch<React.SetStateAction<{
        list: {
            main: {
                temp: number;
            };
            weather: {
                icon: string
            }[];
            dt_txt: string;
        }[];
    } | null>>;
}

const NextFive: React.FC<NextFiveProps> = ({ data, setData }) => {
    return (
        <div className={`flex flex-wrap items-center justify-between`}>
        {data?.list?.map((item, index) => (
            <div
            key={index}
            className={`w-full sm:w-1/2 lg:w-1/4 p-2`}
            >
            <div
                style={{ width: '100%', height: '18vh' }}
                className={`bg-gray-300 items-center flex justify-start flex-col m-2`}
            >
                <div
                className={`w-3/4 h-1/2 bg-gray-300 flex items-center justify-center `}
                >
                <Image
                    width={80}
                    height={100}
                    objectFit='contain'
                    src={`http://openweathermap.org/img/w/${item.weather.icon}.png`}
                    alt='Weather Icon'
                />
                </div>
                <div
                className={`w-full h-1/2 bg-gray-300 p-2 justify-center flex flex-row items-center`}
                >
                <h4 className={`font-bold text-black text-lg`}>
                    {item.dt_txt}:
                </h4>
                <h4 className={`font-normal text-black text-lg ml-2`}>
                    {item.main.temp}°С
                </h4>
                </div>
            </div>
            </div>
        ))}
        </div>
    );
};
export default NextFive