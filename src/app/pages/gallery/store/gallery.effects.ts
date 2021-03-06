import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, take } from 'rxjs';

import * as actions from './gallery.actions';
import { GalleryService } from './gallery.services';

@Injectable()
export class GalleryEffect {
  constructor(private actions$: Actions, private service: GalleryService) {}

  initUser$ = createEffect(() =>
    this.actions$.pipe(
      take(1),
      ofType(actions.galleryAction),
      switchMap(() => {
        return this.service.getGalleryService().pipe(
          map((data) => {
            return actions.gallerySuccessAction({ response: data });
          }),
          catchError((err) => {
            console.log(err);
            return of(actions.galleryErrorAction({ error: err }));
          })
        );
      })
    )
  );

  initUser1$ = createEffect(() =>
    this.actions$.pipe(
      take(1),
      ofType(actions.galleryAction),
      switchMap(() =>
        this.service.getGalleryService().pipe(
          map((data) => {
            return actions.gallerySuccessAction({ response: data });
          }),
          catchError((err) => {
            console.log(err);
            return of(actions.galleryErrorAction({ error: err }));
          })
        )
      )
    )
  );
}
