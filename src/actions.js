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
 } from './constants'
import  axiosInstance  from './apis/client'

export const requestGameState = () => async(dispatch) => {
  dispatch({ type: REQUEST_GAME_STATE_PENDING })
  const params = {"user_name": "vinay"};
    try{
        const result = await axiosInstance.get('/game', {params});
        dispatch({type: REQUEST_GAME_STATE_SUCCESS, payload: result});
    }
    catch(e){
        console.log(e);
        dispatch({type: REQUEST_GAME_STATE_FAILED});
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