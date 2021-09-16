import random from 'lodash/random';
// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3];
export const testNodes = ['https://data-seed-prebsc-1-s1.binance.org:8545/'];

const getNodeUrl = (chainId) => {
  if (chainId === 56) {
    const randomIndex = random(0, nodes.length - 1);
    return nodes[randomIndex];
  } else {
    return 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  }
};

export default getNodeUrl
