// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MarketPlace {

    struct Apartment {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountappartment;
        string image;
        address[] senders;
        uint256[] senderamount;
    }

    mapping(uint256 => Apartment) public apartments;

    uint256 public numberOfApartments = 0;

    function createApartment(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
      Apartment storage apartment = apartments[numberOfApartments]; 

      // is everything okay?

       require(apartment.deadline <block.timestamp, "the deadline should be a date in the future");

       apartment.owner = _owner;
       apartment.title = _title;
       apartment.description = _description;
       apartment.target = _target;
       apartment.deadline = _deadline;
       apartment.amountappartment = 0;
       numberOfApartments++;

       return numberOfApartments-1;


    }

    function sellApartment(uint256 _id) public payable {

        uint256 amount = msg.value;


        Apartment storage apartment = apartments[_id];

        apartment.senders.push(msg.sender);
        apartment.senderamount.push(amount);

        (bool sent,) =  payable(apartment.owner).call{value: amount}("");

        if(sent) {
            apartment.amountappartment = apartment.amountappartment + amount;
        }

    }

    function getSender(uint256 _id) view public returns (address[] memory, uint256[] memory){
        return (apartments[_id].senders, apartments[_id].senderamount);
    }

    function getApartments() public view returns (Apartment[] memory) {

        Apartment[] memory allApartment = new Apartment[](numberOfApartments);

        for(uint i = 0 ; i<numberOfApartments; i++){
            Apartment storage item = apartments[i];
            allApartment[i] = item;
        }

        return allApartment;

    }





}