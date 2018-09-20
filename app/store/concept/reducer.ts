import {Actions} from './actions'
export type ConceptsState = {
  [prop: string]: {
    description: string
    learnMore: string
    name: String
}
}
let initialState = {}

export function ConceptsReducer (state = initialState, action:Actions):ConceptsState {
  switch (action.type) {
    case "RECEIVE_CONCEPTS":
      return action.concepts
    default:
      return state
  }
}