import {
    REQUEST_GAME_STATE_FAILED,
    REQUEST_GAME_STATE_SUCCESS,
    REQUEST_GAME_STATE_PENDING
   } from './constants';
  
  const initialStateGame = {
    cards: [],
    isPending: true
  }
  
  export const requestGameState = (state=initialStateGame, action={}) => {
    switch (action.type) {
      case REQUEST_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case REQUEST_GAME_STATE_SUCCESS:
        return {...state, robots: action.payload, isPending: false}
      case REQUEST_GAME_STATE_FAILED:
        return {...state, error: action.payload}
      default:
        return state
    }
  }
  