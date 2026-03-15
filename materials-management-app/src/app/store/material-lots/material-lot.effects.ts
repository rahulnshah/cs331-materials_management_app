import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  loadMaterialLots,
  loadMaterialLotsSuccess,
  loadMaterialLotsFailure,
  addMaterialLot,
  addMaterialLotSuccess,
  addMaterialLotFailure,
  deleteMaterialLot,
  deleteMaterialLotSuccess,
  deleteMaterialLotFailure,
  updateMaterialLot,
  updateMaterialLotSuccess,
  updateMaterialLotFailure,
} from './material-lot.actions';
import { ApiService } from '../../core/services/api.service';
import { MaterialLot } from '../../models/model';

@Injectable()
export class MaterialLotEffects {
  loadMaterialLots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMaterialLots),
      switchMap(() =>
        this.apiService.getMaterialLots().pipe(
          map((response: MaterialLot[]) => loadMaterialLotsSuccess({ materialLots: response })),
          catchError((error: Error) => of(loadMaterialLotsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  addMaterialLot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMaterialLot),
      switchMap((action: ReturnType<typeof addMaterialLot>) =>
        this.apiService.addMaterialLot(action.materialLot).pipe(
          map((response) =>
            addMaterialLotSuccess({
              successMessage: response.message,
              materialLot: action.materialLot,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(addMaterialLotFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  updateMaterialLot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMaterialLot),
      switchMap((action: ReturnType<typeof updateMaterialLot>) =>
        this.apiService.updateMaterialLot(action.lot_number, action.materialLot).pipe(
          map((response) =>
            updateMaterialLotSuccess({
              successMessage: response.message,
              materialLot: action.materialLot,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(updateMaterialLotFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteMaterialLot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMaterialLot),
      switchMap((action: ReturnType<typeof deleteMaterialLot>) =>
        this.apiService.deleteMaterialLot(action.lot_number).pipe(
          map((response) =>
            deleteMaterialLotSuccess({
              lot_number: action.lot_number,
              successMessage: response.message,
            }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(deleteMaterialLotFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {}
}
