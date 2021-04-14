import { act } from '@testing-library/react';
import {
    REQUEST_GAME_STATE_FAILED,
    REQUEST_GAME_STATE_SUCCESS,
    REQUEST_GAME_STATE_PENDING,
    SET_GAME_STATE_PENDING,
    SET_GAME_STATE_SUCCESS,
    SET_GAME_STATE_FAILED,
    PUT_GAME_STATE_PENDING,
    PUT_GAME_STATE_SUCCESS,
    REQUEST_LEADERBOARD_PENDING,
    REQUEST_LEADERBOARD_SUCCESS,
    SET_USERNAME_SUCCESS
   } from './constants';
  
  const getUsers = {
    userScores: []
  }
  
  export const getLeaderBoard = (state=getUsers, action={}) => {
    switch (action.type) {
      case REQUEST_LEADERBOARD_SUCCESS:
        console.log("action.payload.data ", action.payload.data)
        return {...state, userScores: action.payload?.data}
      case REQUEST_LEADERBOARD_PENDING:
        return {...state, isPending: true}
      default:
        return state
    }
  }

  const gameStateMain = {
    gameCards: null,
    isPending: true,
    score: 0,
    hasDefuseCard: "false",
    activeCard: ""
  }


  export const gameState = (state=gameStateMain, action={}) => {
    switch (action.type) {
      case SET_USERNAME_SUCCESS:
        console.log("test: ", action.payload)
        return {...state, user_name: action.payload}
      case REQUEST_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case REQUEST_GAME_STATE_SUCCESS:
        let gameCardsArr = [];
        if(action.payload?.data?.gamecards?.length > 0){
          gameCardsArr = action.payload?.data?.gamecards?.split(',')
        }
        return {...state, gameCards: gameCardsArr, activeCard: action.payload?.data?.activeCard,
          hasDefusedCard: action.payload?.data?.hasDefusedCard, isPending: false, score: action.payload?.data?.score}
      case REQUEST_GAME_STATE_FAILED: 
        return {...state, error: action.payload}
      case SET_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case SET_GAME_STATE_SUCCESS:
        return {...state, gameCards: action.payload?.gameCards, isPending: false}
      case SET_GAME_STATE_FAILED:
        return {...state, error: action.payload}
      case PUT_GAME_STATE_PENDING:
        return {...state, isPending: true}
      case PUT_GAME_STATE_SUCCESS:
        return {...state, gameCards: action.payload?.gameCards, activeCard: action.payload?.activeCard,
          hasDefusedCard: action.payload?.hasDefusedCard, isPending: false, score: action.payload?.score}
      default:
        return state
    }
  }
  