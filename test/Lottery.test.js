const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { abi, bytecode } = require('../compiler');

const web3 = new Web3(ganache.provider());

let accounts;
let Lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  console.log('web3 abi', await web3.eth.Contract(JSON.parse(abi)));

  Lottery = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: 1000000 });
});

describe('Lottery Deployment', () => {
  it('should deployed successfully and should return Manager address  ', () => {});
});
