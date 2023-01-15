import React, { useState, useEffect } from 'react'

import { DisplayApartments } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Apartments, setApartments] = useState([]);

  const { address, contract, getApartments } = useStateContext();

  const fetchApartments = async () => {
    setIsLoading(true);
    const data = await getApartments();
    setApartments(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchApartments();
  }, [address, contract]);

  return (
    <DisplayApartments 
      title="All Apartments"
      isLoading={isLoading}
      Apartments={Apartments}
    />
  )
}

export default Home