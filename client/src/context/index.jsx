import React, { createContext, useContext } from 'react';

import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

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
    const parsedCampaings = Apartment.map((apartment, i) => ({
      owner: apartment.owner,
      title: apartment.title,
      name: apartment.name,
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

  const getSender = async (pId) => {
    const senders = await contract.call('getSender', pId);
    const numberOfSenders = senders[0].length;

    const parsedSenters = [];

    for(let i = 0; i < numberOfSenders; i++) {
      parsedSenters.push({
        senderappartment: senders[0][i],
        senderamount: ethers.utils.formatEther(senders[1][i].toString())
      })
    }

    return parsedSenters;
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
        getSender,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);