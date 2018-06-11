const assessmentABI = require('../build/contracts/Assessment.json').abi
const conceptABI = require('../build/contracts/Concept.json').abi
const fathomTokenArtifact = require('../build/contracts/FathomToken.json')
const conceptRegistryArtifact = require('../build/contracts/ConceptRegistry.json')

function getContractInstance (web3, abi, address) {
  return new web3.eth.Contract(abi, address)
}

export const convertDate = (unixTimestamp) => {
  let date = new Date(unixTimestamp * 1000) // input in milliseconds
  return date.toString()
}

export const getInstance = {
  assessment: (state, address) => getContractInstance(state.ethereum.web3, assessmentABI, address),
  concept: (state, address) => getContractInstance(state.ethereum.web3, conceptABI, address),
  fathomToken: (state) => {
    return getContractInstance(
      state.ethereum.web3,
      fathomTokenArtifact.abi,
      fathomTokenArtifact.networks[state.ethereum.networkID].address
    )
  },
  conceptRegistry: (state) => {
    return getContractInstance(
      state.ethereum.web3,
      conceptRegistryArtifact.abi,
      conceptRegistryArtifact.networks[state.ethereum.networkID].address
    )
  }
}