import Web3 from 'web3'
import { getInstance } from './utils.js'
// import Ganache from 'ganache-core'

export const WEB3_CONNECTED = 'WEB3_CONNECTED'
export const WEB3EVENTS_CONNECTED = 'WEB3EVENTS_CONNECTED'
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED'
export const RECEIVE_VARIABLE = 'RECEIVE_VARIABLE'

// actions to instantiate web3 related info
export const connect = () => {
  return async (dispatch, getState) => {
    // get web3 object with right provider
    if (typeof window.web3 !== 'undefined') {

      // set first web3 instance to do read and write calls via Metamask
      let w3 = new Web3(window.web3.currentProvider)
      // after web3 is instanciated, fetch networkID and user address
      if (w3) {
        dispatch(web3Connected(w3))

        // get networkID
        let networkID = await w3.eth.net.getId()
        dispatch(receiveVariable('networkID', networkID))

        // get userAddress
        let accounts = await w3.eth.getAccounts()
        if (accounts.length === 0) {
          dispatch(receiveVariable('userAddress', 'pleaseEnterPasswordToUnblockMetamask'))
        } else {
          dispatch(receiveVariable('userAddress', accounts[0]))
          // get balance from contract
          let fathomTokenInstance = getInstance.fathomToken(getState())
          let userBalance = await fathomTokenInstance.methods.balanceOf(accounts[0]).call()
          dispatch(receiveVariable('AhaBalance', userBalance))
        }

        // set a second web3 instance to subscribe to events via websocket
        // var Ganache = require('ganache-core')
        // console.log('Ganache ', Ganache )
        let web3events = new Web3()
        let providerAddress = networkID === 4 ? 'wss://rinkeby.infura.io/ws' : 'ws://localhost:8545'
        console.log('providerAddress ', providerAddress )
        const eventProvider = new Web3.providers.WebsocketProvider(providerAddress)
         eventProvider.on('error', e => console.error('WS Error', e))
        eventProvider.on('end', e => console.error('WS End', e))
        web3events.setProvider(eventProvider)
        dispatch(web3EventsConnected(web3events))
        // web3events.setProvider(Ganache.provider())

        // set a loop function to check userAddress or network change
        dispatch(loopCheckAddressAndNetwork())

      } else {
        dispatch(web3Disconnected())
      }
    } else {
      // if no metamask, use rinkeby and set to public View
      let w3 = new Web3('https://rinkeby.infura.io/2FBsjXKlWVXGLhKn7PF7')
      dispatch(web3Connected(w3))
      dispatch(receiveVariable('userAddress', 'publicView'))
    }
  }
}

// checks userAddress and networkID every second to detect change and reload app
export const loopCheckAddressAndNetwork = () => {
  return async (dispatch, getState) => {
    setInterval(async function () {
      let w3 = getState().ethereum.web3

      // get networkID and compare to previous
      let networkID = await w3.eth.net.getId()
      if (networkID !== getState().ethereum.networkID) {
        // if different, just reload the whole app (all the data is changed)
        // maybe we could call connect() instead but since all components reload its kinda the same...
        window.location.reload()
      }

      // get userAddress and compare to previous
      let accounts = await w3.eth.getAccounts()
      if (accounts.length === 0) {
        dispatch(receiveVariable('userAddress', 'pleaseEnterPasswordToUnblockMetamask'))
      } else {
        if (accounts[0] !== getState().ethereum.userAddress) {
          // if different, just reload the whole app (all the data is changed)
          // maybe we could call connect() instead but since all components reload its kinda the same...
          window.location.reload()
        }
      }
    }, 1000)
  }
}

// action to save the connedted web3-instance in state
export function web3Connected (web3) {
  return {
    type: WEB3_CONNECTED,
    payload: {
      web3: web3,
      version: web3.version
    }
  }
}

// action to save the websocket web3-instance in state
export function web3EventsConnected (web3) {
  return {
    type: WEB3EVENTS_CONNECTED,
    payload: {
      web3events: web3
    }
  }
}
// to save in state that one could not connect
export function web3Disconnected () {
  return {
    type: WEB3_DISCONNECTED,
    payload: {}
  }
}

// to save something from the chain in state
export function receiveVariable (name, value) {
  return {
    type: RECEIVE_VARIABLE,
    name,
    value
  }
}
