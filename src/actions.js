import {
    REQUEST_GAME_STATE_PENDING,
    REQUEST_GAME_STATE_SUCCESS,
    REQUEST_GAME_STATE_FAILED
 } from './constants'
import { axiosInstance } from './apis/client'

export const requestGameState = () => async(dispatch) => {
  dispatch({ type: REQUEST_GAME_STATE_PENDING })
  const params = {"user_name": "vinay"};

  const result = await axiosInstance.get('/game', {...params});
  console.log("result", result);
}