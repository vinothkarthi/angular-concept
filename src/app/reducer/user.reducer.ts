import { userActions } from "../action/user.action";
import { initialState } from "../state/user.state"
import {createReducer,on} from "@ngrx/store"

const _userReducer = createReducer(initialState, on(userActions.loadUserSuccess,(state,action)=>{
  return {
    ...state,
    personalDetail:action.data
  }
}),on(userActions.loadPostSuccess,(state,action)=>{
  return {
    ...state,
    post:action.data
  }
}));

export function userReducer(state:any, action:any) {
  return _userReducer(state, action)
}
