import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SharedService } from "../service/shared.service";
import { userActions } from "../action/user.action";
import { catchError, delay, map, of, switchMap } from "rxjs";
import { personalDetail, posts } from "../interface/user.interface";
import { Store } from "@ngrx/store";

@Injectable()
export class UserEffect {
  constructor(private action$: Actions,private sharedSrv: SharedService,private store: Store) {}
  loadUser$ = createEffect(()=>this.action$.pipe(
    ofType(userActions.getUsers),
    switchMap(()=> this.sharedSrv.getUsers().pipe(
      map((data:any) => {
        const users: personalDetail[] = [];
        data.forEach((value: any) => {
          const {id, name, email} = value;
          users.push({id, name, email})
      })
      return userActions.loadUserSuccess({data: users})
    }),
    catchError(err => of(err))
  ))
  ))

  loadPost$ = createEffect(()=>this.action$.pipe(
    ofType(userActions.getPosts),
    switchMap(()=> this.sharedSrv.getPosts().pipe(
      map((data:any) => {
      const posts:posts[] = [];
      data.forEach((value: any) => {
        const {userId, id, title, body} = value;
        posts.push({userId, id, title, body})
        });
      userActions.loadPostSuccess({data: posts})
    }),
    catchError(err => of(err))
  ))
  ))
}
