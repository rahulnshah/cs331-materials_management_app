import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaterialLotState } from './material-lot.state';

export const selectMaterialLotState = createFeatureSelector<MaterialLotState>('materialLots');

export const selectAllMaterialLots = createSelector(
  selectMaterialLotState,
  (state) => state.materialLots,
);

export const selectSelectedMaterialLot = createSelector(
  selectMaterialLotState,
  (state) => state.selectedMaterialLot,
);

export const selectMaterialLotLoading = createSelector(
  selectMaterialLotState,
  (state) => state.loading,
);

export const selectMaterialLotError = createSelector(
  selectMaterialLotState,
  (state) => state.error,
);

export const selectMaterialLotSuccessMessage = createSelector(
  selectMaterialLotState,
  (state) => state.successMessage,
);
