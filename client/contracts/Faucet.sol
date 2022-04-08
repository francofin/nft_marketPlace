// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    //storage variables
    uint public numberOfDonors;
    mapping(address => bool) private donors;
    mapping(uint => address) private lutDonors;

    receive() external payable{
    }

    function addFunds() external payable {
        address donor = msg.sender;
        if(!donors[donor]){
            numberOfDonors++;
            donors[donor] = true;
            lutDonors[numberOfDonors] = donor;
        } 
    }

    function getDonors() public view returns(address[] memory) {
        address[] memory _donors = new address[](numberOfDonors);
        for(uint i=0; i<numberOfDonors; i++){
            _donors[i] = lutDonors[i];
        }
        return _donors;
    }

    //using this when a fucntion or variable is determined as external cost more gas to call an internal function.

    function getDonorAtIndex(uint8 index) public view returns(address) {
        return lutDonors[index];
    }



}



//const instance = await Faucet.deployed()
//instance.addFunds({from:account[0], to:"20000000000})