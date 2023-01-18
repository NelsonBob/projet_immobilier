import React, { useState, useEffect } from 'react'

import { DisplayApartments } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Apartments, setApartments] = useState([]);

  const { address, contract, getUserApartment } = useStateContext();

  const fetchApartments = async () => {
    setIsLoading(true);
    const data = await getUserApartment();
    setApartments(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchApartments();
  }, [address, contract]);

  return (
    <DisplayApartments 
      title="My Apartments"
      isLoading={isLoading}
      Apartments={Apartments}
    />
  )
}

export default Profile