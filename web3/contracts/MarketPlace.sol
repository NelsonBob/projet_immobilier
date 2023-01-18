// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MarketPlace {

    struct Apartment {
        address payable owner;
        string name;
        string title;
        string description;
        uint256 deadline;
        uint256 amountappartment;
        string image;
        address senderappartment;
        uint256[] senderamount;
    }

    

    mapping(uint256 => Apartment) public apartments; 
    mapping(address => uint) public balances;

    uint256 public numberOfApartments = 0;

    function createApartment(address payable _owner, string memory _title, string memory _name, string memory _description, uint256 _amountappartment, uint256 _deadline, string memory _image) public returns (uint256) {
      Apartment storage apartment = apartments[numberOfApartments]; 

      // is everything okay?

       require(apartment.deadline <block.timestamp, "the deadline should be a date in the future");

       apartment.owner = _owner;
       apartment.title = _title;
       apartment.name = _name;
       apartment.description = _description;
       apartment.deadline = _deadline;
       apartment.amountappartment = _amountappartment;
       apartment.image = _image;
       numberOfApartments++;

       return numberOfApartments-1;



    }



    function deposit() public payable {
        require(msg.value > 0);
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 _id) public {

        
        Apartment storage apartment = apartments[_id];
      
        require(apartment.amountappartment <= balances[msg.sender], "Invalid amount");
        apartment.owner.transfer(apartment.amountappartment*10**5 );
        apartment.senderappartment  = msg.sender;

        emit Withdrawal(apartment.senderappartment, apartment.owner, apartment.amountappartment );
    }

 event Withdrawal(address indexed from, address indexed to, uint amount);


    function getApartments() public view returns (Apartment[] memory) {

        Apartment[] memory allApartments = new Apartment[](numberOfApartments);

        for(uint i = 0 ; i<numberOfApartments; i++){
            Apartment storage item = apartments[i];
            allApartments[i] = item;
        }

        return allApartments;

    }





}