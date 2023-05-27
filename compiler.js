const path = require('path');
const fs = require('fs');
const solc = require('solc');

const LotteryPathFile = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(LotteryPathFile, 'utf8');

let input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

let LotteryCompiler = output.contracts[['Lottery.sol']]['Lottery'];
let abi = LotteryCompiler.abi;
let bytecode = LotteryCompiler.evm.bytecode.object;

module.exports = { abi, bytecode };
