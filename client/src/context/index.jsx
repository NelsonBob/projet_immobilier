import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x6b7A41F9A680f68cfE33FeF1EDcf566fa6e26580');
  const { mutateAsync: createApartment } = useContractWrite(contract, 'createApartment');

  const address = useAddress();
  const connect = useMetamask();

  const publishapartment = async (form) => {
    try {
      const data = await createApartment([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getApartments = async () => {
    const Apartment = await contract.call('getApartments');
    console.log("dddddddddddddddddddddddddd "+Apartment[0].amountCollected)
    const parsedCampaings = Apartment.map((apartment, i) => ({
      owner: apartment.owner,
      title: apartment.title,
      description: apartment.description,
      target: ethers.utils.formatEther(apartment.target.toString()),
      deadline: apartment.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(apartment.amountCollected==undefined?"0":apartment.amountCollected.toString()),
      image: apartment.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserApartment = async () => {
    const allapartments = await getApartments();

    const filteredapartments = allapartments.filter((apartment) => apartment.owner === address);

    return filteredapartments;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToapartment', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createApartment: publishapartment,
        getApartments,
        getUserApartment,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);