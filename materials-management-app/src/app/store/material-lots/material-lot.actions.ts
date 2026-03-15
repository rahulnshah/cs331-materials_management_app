import { createAction, props } from '@ngrx/store';
import { MaterialLot } from '../../models/model';

export const loadMaterialLots = createAction('[Material Lot] Load Material Lots');

export const loadMaterialLotsSuccess = createAction(
  '[Material Lot] Load Material Lots Success',
  props<{ materialLots: MaterialLot[] }>(),
);

export const loadMaterialLotsFailure = createAction(
  '[Material Lot] Load Material Lots Failure',
  props<{ error: string }>(),
);

export const selectMaterialLot = createAction(
  '[Material Lot] Select Material Lot',
  props<{ materialLot: MaterialLot }>(),
);

export const addMaterialLot = createAction(
  '[Material Lot] Add Material Lot',
  props<{ materialLot: MaterialLot }>(),
);

export const addMaterialLotSuccess = createAction(
  '[Material Lot] Add Material Lot Success',
  props<{ materialLot: MaterialLot; successMessage: string }>(),
);

export const addMaterialLotFailure = createAction(
  '[Material Lot] Add Material Lot Failure',
  props<{ error: string }>(),
);

export const updateMaterialLot = createAction(
  '[Material Lot] Update Material Lot',
  props<{ lot_number: string; materialLot: MaterialLot }>(),
);

export const updateMaterialLotSuccess = createAction(
  '[Material Lot] Update Material Lot Success',
  props<{ materialLot: MaterialLot; successMessage: string }>(),
);

export const updateMaterialLotFailure = createAction(
  '[Material Lot] Update Material Lot Failure',
  props<{ error: string }>(),
);

export const deleteMaterialLot = createAction(
  '[Material Lot] Delete Material Lot',
  props<{ lot_number: string }>(),
);

export const deleteMaterialLotSuccess = createAction(
  '[Material Lot] Delete Material Lot Success',
  props<{ lot_number: string; successMessage: string }>(),
);

export const deleteMaterialLotFailure = createAction(
  '[Material Lot] Delete Material Lot Failure',
  props<{ error: string }>(),
);
