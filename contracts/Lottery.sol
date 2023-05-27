// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Lottery {
  address public manager;
  address payable[] public players;

  constructor() {
    manager = msg.sender;
  }

  function enter() public payable {
    require(msg.value > 0.1 ether);

    players.push(payable(msg.sender));
  }

  modifier restrected() {
    require(msg.sender == manager);
    _;
  }

  function randomNumber() private view returns (uint) {
    return uint(keccak256(abi.encode(block.prevrandao, block.timestamp, players)));
  }

  function pickWinner() public restrected {
    uint winnerIndex = randomNumber() % players.length;
    uint amount = address(this).balance;

    players[winnerIndex].transfer(amount);
    players = new address payable[](0);
  }

  function getPlayers() public view returns (address payable[] memory) {
    return players;
  }
}
