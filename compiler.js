const path = require('path');
const fs = require('fs');
const solc = require('solc');

const LotteryPathFile = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(LotteryPathFile, 'utf8');
console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[':Lottery'];
