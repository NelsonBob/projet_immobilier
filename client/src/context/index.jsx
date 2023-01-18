import React, { createContext, useContext } from "react";

import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x679C841c948b131EC27B907B466d7298a82cbab6"
  );
  const { mutateAsync: createApartment } = useContractWrite(
    contract,
    "createApartment"
  );
  const { mutateAsync: withdraw } = useContractWrite(contract, "withdraw");

  const address = useAddress();
  const connect = useMetamask();

  const publishapartment = async (form) => {
    try {
      const data = await createApartment([
        address, // owner
        form.name, //name
        form.title, // title
        form.description, // description
        form.amountappartment,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const buyapartment = async (id) => {
    try {
      const apartments = await contract.call("getApartments");
      const filteredapartment = apartments.filter(
        (apartment) => apartment.pId === id
      );
      const data = await withdraw([filteredapartment.pId]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const getApartments = async () => {
    const Apartment = await contract.call("getApartments");
    const parsedCampaings = Apartment.map((apartment, i) => ({
      owner: apartment.owner,
      title: apartment.title,
      name: apartment.name,
      amountappartment: apartment.amountappartment.toString(),
      description: apartment.description,
      deadline: apartment.deadline.toNumber(),
      image: apartment.image,
      pId: i,
    }));

    return parsedCampaings;
  };

  const getUserApartment = async () => {
    const allapartments = await getApartments();
    const filteredapartments = allapartments.filter(
      (apartment) => apartment.owner === address
    );

    return filteredapartments;
  };
  const searchApartment = async (searchApartment) => {
    const allapartments = await contract.call("getApartments");

    const filteredapartments = allapartments.filter(
      (apartment) => apartment.title == searchApartment
    );

    return filteredapartments;
  };

  const getSender = async (pId) => {
    const senders = await contract.call("getSender", pId);
    const numberOfSenders = senders[0].length;

    const parsedSenters = [];

    for (let i = 0; i < numberOfSenders; i++) {
      parsedSenters.push({
        senderappartment: senders[0][i],
        senderamount: ethers.utils.formatEther(senders[1][i].toString()),
      });
    }

    return parsedSenters;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createApartment: publishapartment,
        getApartments,
        getUserApartment,
        searchApartment,
        buyapartment,
        getSender,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
