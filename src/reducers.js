import {
    REQUEST_GAME_STATE_FAILED,
    REQUEST_GAME_STATE_SUCCESS,
    REQUEST_GAME_STATE_PENDING,
    SET_GAME_STATE_PENDING,
    SET_GAME_STATE_SUCCESS,
    SET_GAME_STATE_FAILED,
    PUT_GAME_STATE_PENDING,
    PUT_GAME_STATE_SUCCESS,
    PUT_GAME_STATE_FAILED
   } from './constants';
  
  const gameStateMain = {
    gameCards: [],
    isPending: true,
    score: "0",
    hasDefuseCard: "false",
    activeCard: ""
  }
  
  export const gameState = (state=gameStateMain, action={}) => {
    switch (action.type) {
      case REQUEST_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case REQUEST_GAME_STATE_SUCCESS:
        return {...state, gameCards: action.payload?.data?.gameCards, isPending: false}
      case REQUEST_GAME_STATE_FAILED:
        return {...state, error: action.payload}
      case SET_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case SET_GAME_STATE_SUCCESS:
        console.log("hfsjfa ", action.payload)
        return {...state, gameCards: action.payload?.gameCards, isPending: false}
      case SET_GAME_STATE_FAILED:
        return {...state, error: action.payload}
      case PUT_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case PUT_GAME_STATE_SUCCESS:
        console.log("bdjbs ", action.payload)
        return {...state, gameCards: action.payload?.gameCards, activeCard: action.payload?.activeCard,
          hasDefusedCard: action.payload?.hasDefusedCard, isPending: false}    
      default:
        return state
    }
  }
  