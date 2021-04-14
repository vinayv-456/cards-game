import {
    REQUEST_GAME_STATE_PENDING,
    REQUEST_GAME_STATE_SUCCESS,
    REQUEST_GAME_STATE_FAILED,
    SET_GAME_STATE_PENDING,
    SET_GAME_STATE_SUCCESS,
    SET_GAME_STATE_FAILED,
    PUT_GAME_STATE_PENDING,
    PUT_GAME_STATE_SUCCESS,
    PUT_GAME_STATE_FAILED,
    REQUEST_LEADERBOARD_SUCCESS,
    REQUEST_LEADERBOARD_PENDING,
    SET_USERNAME_SUCCESS
 } from './constants'
import  axiosInstance  from './apis/client'

export const requestGameState = (params) => async(dispatch) => {
  dispatch({ type: REQUEST_GAME_STATE_PENDING })
    try{
        const result = await axiosInstance.get('/game', {params});
        dispatch({type: REQUEST_GAME_STATE_SUCCESS, payload: result});
    }
    catch(e){
        console.log(e);
        dispatch({type: REQUEST_GAME_STATE_FAILED});
    }
}

export const setUserName = (params) => async(dispatch) => {
    try{
        dispatch({type: SET_USERNAME_SUCCESS, payload: params});
    }
    catch(e){
        console.log(e);
    }
}

export const setGameState = (params) => async(dispatch) => {
    dispatch({ type: SET_GAME_STATE_PENDING })
      try{
          await axiosInstance.post('/game', {...params});
          dispatch({type: SET_GAME_STATE_SUCCESS, payload: params});
      }
      catch(e){
          console.log(e);
          dispatch({type: SET_GAME_STATE_FAILED});
      }
  }

  export const putGameState = (params) =>  async(dispatch) => {
    dispatch({ type: PUT_GAME_STATE_PENDING })
      try{
          await axiosInstance.put('/game', {...params});
          dispatch({type: PUT_GAME_STATE_SUCCESS, payload: params});
      }
      catch(e){
          console.log(e);
          dispatch({type: PUT_GAME_STATE_FAILED});
      }
  }

export const getLeaderBoard = () =>  async(dispatch) => {
    dispatch({ type: REQUEST_LEADERBOARD_PENDING })
      try{
          const result = await axiosInstance.get('/leader-board');
          dispatch({type: REQUEST_LEADERBOARD_SUCCESS, payload: result});
      }
      catch(e){
          console.log(e);
      }
}