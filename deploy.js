const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { interface, bytecode } = require('./compiler');

const mnemonic =
  'enjoy donkey prison solve exchange stumble expand long glass soccer rhythm pioneer';

const GoerliUrl = 'https://sepolia.infura.io/v3/072598c1d17449408b5f5dee32de2c64';

const HDProvider = new HDWalletProvider(mnemonic, GoerliUrl);

const web3 = new Web3(HDProvider);

const deploy = async () => {
  const account = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: account[0], gas: 1000000 });
  console.log(result.options.address);
  HDProvider.engine.stop();
};

deploy();
