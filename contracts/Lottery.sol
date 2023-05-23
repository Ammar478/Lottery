// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24 <0.9.0;

contract Lottery{
    address public manager;
    address[]  public players;

    constructor (){
        manager=msg.sender; 
    }

    function enter()public payable{
        require(msg.value>0.1 ether);
        players.push(msg.sender);
    }

    modifier restrected (){
        require(msg.sender ==manager);
        _;
    }

    function randomNumber()private view returns (uint){
        return uint(keccak256(abi.encode(block.prevrandao , block.timestamp, players)));
    }

function pickWinner()public restrected{
    uint winnerIndex = randomNumber()%players.length;
  address payable winnerAddress= payable(players[winnerIndex]);
  
   winnerAddress.transfer(address(this).balance);
    players= new address[](0);

}

function getPlayers()public view returns(address[] memory){
    return players;
}

}