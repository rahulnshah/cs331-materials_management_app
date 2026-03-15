import { MaterialLot } from '../../models/model';

export interface MaterialLotState {
  materialLots: MaterialLot[];
  selectedMaterialLot: MaterialLot | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialMaterialLotState: MaterialLotState = {
  materialLots: [],
  selectedMaterialLot: null,
  loading: false,
  loaded: false,
  error: null,
  successMessage: null,
};
