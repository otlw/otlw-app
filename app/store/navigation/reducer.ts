import { Action } from './actions'

export type NavigationState = {
  dashboardTab: 'Current' | 'Available' | 'Past'
  mainDisplay: 'Main' | 'UnlockMetamask' | 'NoMetamask' | 'UndeployedNetwork'
  notificationBar:
    { display: false } |
    {
      display: true
      type: 'success' | 'error'
    },
  inputBar: string,
  showHiddenCards: boolean
}

const initialState:NavigationState = {
  dashboardTab: 'Current',
  mainDisplay: 'Main',
  notificationBar: {
    display: false
  },
  inputBar: '',
  showHiddenCards: false
}

export function NavigationReducer (state = initialState, action:Action):NavigationState {
  switch (action.type) {
    case 'SET_DASHBOARD_TAB':
      return {
        ...state,
        dashboardTab: action.dashboardTab
      }
    case 'SET_MAIN_DISPLAY':
      return {
        ...state,
        mainDisplay: action.mainDisplay
      }
    case 'SET_NOTIFICATION_BAR':
      return {
        ...state,
        notificationBar: action.notificationBar
      }
    case 'SET_INPUT_BAR':
      return {
        ...state,
        inputBar: action.inputBar
      }
    case 'TOGGLE_HIDDEN_CARDS':
      return {
        ...state,
        showHiddenCards: !state.showHiddenCards
      }
    default: return state
  }
}