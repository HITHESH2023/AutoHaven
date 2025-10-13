import React from 'react';
import { GiSteeringWheel, GiCarSeat } from 'react-icons/gi';
import { FaGasPump } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const thumbnailUrl = car.images[0].replace(
    "/upload/",
    "/upload/w_500,c_fill,q_auto/"
  );

  return (
    <Link to={`/Details/${car.id}`}>
      <div className="border p-1 rounded-2xl">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-[340px] h-[480px] md:w-[360px] md:h-[500px] z-0 p-6 bg-gray-100 rounded-2xl flex flex-col justify-between"
        >
          <div className="space-y-4 flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold">{car.model}</h1>

            <h1 className="flex items-start">
              <span className="text-lg md:text-xl">Rs</span>
              <span className="ml-1 text-3xl md:text-4xl font-bold">{car.price}</span>
            </h1>

            {/* ✅ Bigger image */}
            <div className="w-full h-[220px] md:h-[240px]">
              <img
                src={thumbnailUrl}
                alt={car.model}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {isHovered ? (
            <button className="w-full p-3 md:p-4 bg-indigo-600/80 text-white text-base md:text-lg rounded-lg">
              View More
            </button>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col items-center space-y-2 text-sm md:text-base text-gray-500">
                <GiSteeringWheel size={28} />
                <p>{car.transmissiontype}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-sm md:text-base text-gray-500">
                <GiCarSeat size={28} />
                <p>{car.seatingcapacity}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-sm md:text-base text-gray-500">
                <FaGasPump size={28} />
                <p>{car.mileage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
