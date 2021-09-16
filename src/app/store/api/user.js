// import Web3 from 'web3';
// import projectAbi from '../constants/projectContractAbi.json';

// export default class User {
//   static buyToken({ accountAddress, contractAddress, amount, callback }) {
//     const contract = new window.web3.eth.Contract(projectAbi, contractAddress);
//     const buyTokenData = contract.methods.buyTokens().encodeABI();
//     const rawTransaction = {
//       value: amount,
//       data: buyTokenData,
//       from: accountAddress,
//       gasLimit: Web3.utils.toHex(600000),
//       to: contractAddress
//     };
//     return window.web3.eth.sendTransaction(rawTransaction, (err, data) => callback(err, data));
//   }
// }

