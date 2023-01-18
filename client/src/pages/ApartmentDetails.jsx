import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";

const ApartmentDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { buyapartment, getSenderAmount, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);

  const remainingDays = daysLeft(state.deadline);

  const handleSender = async () => {
    if (window.confirm("Do you really want to buy appartment?")) {
      setIsLoading(true);

      await buyapartment(state.pId);

      navigate("/");
      setIsLoading(false);
    }
  };
  console.log(remainingDays);
  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="apartment"
            className="w-full h-[410px] object-cover rounded-xl"
          />
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Price Appartment`}
            value={state.amountappartment}
          />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {state.title}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Buy
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <div>
              <div className="text-white text-center text-[18px] leading-[30px] mb-4">
                ETH {state.amountappartment}
              </div>
              <div className="text-[15px] text-white text-center mb-[20px]">
                The money use here is ETH
              </div>
              <CustomButton
                btnType="button"
                title="Buy apartment"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleSender}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
