import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayApartments = ({ title, isLoading, Apartments }) => {
  const navigate = useNavigate();

  const handleNavigate = (apartment) => {
    navigate(`/apartment-details/${apartment.title}`, { state: apartment })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({Apartments.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && Apartments.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any Apartments yet
          </p>
        )}

        {!isLoading && Apartments.length > 0 && Apartments.map((apartment) => <FundCard 
          key={apartment.id}
          {...apartment}
          handleClick={() => handleNavigate(apartment)}
        />)}
      </div>
    </div>
  )
}

export default DisplayApartments