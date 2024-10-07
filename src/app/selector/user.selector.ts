import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userInterface } from "../interface/user.interface";

const getUserState = createFeatureSelector<userInterface>('user');
const getUserPersonal = createSelector(getUserState,(state)=>state.personalDetail)
const getUserPost = createSelector(getUserState,(state)=>state.post)

export const userSelectors = {
  getUserPersonal,
  getUserPost
}

