import { createAction, props } from "@ngrx/store";
import { personalDetail, posts, userInterface } from "../interface/user.interface";

const updateUser= createAction('[app component] updateUser', props<{data: userInterface}>());
const getUsers = createAction('[app component] getUsers');
const getPosts = createAction('[app component] getPosts');
const loadUserSuccess = createAction('[user effect] loadUserSuccess',props<{data: personalDetail[]}>());
const loadPostSuccess = createAction('[user effect] loadPostSuccess',props<{data: posts[]}>());

export const userActions = {
  updateUser,
  getUsers,
  getPosts,
  loadUserSuccess,
  loadPostSuccess
}


