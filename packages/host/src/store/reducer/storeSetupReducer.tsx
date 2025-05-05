import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface LabTypeTableMockDTO {
    Id: number | null;
    Description: string;
    LabType: string;
    Code?: string;
    IsStoreMappingEnabled?: boolean | null;
  }

interface TenderTypeTableMockDTO {
    Id: string;
    BankAccount: string;
    MainAccount: string;
    PaymentTypeId: string;
    Description: string;
    TenderType: string;
}

type CentralStoreData = {
  tenderTypes: TenderTypeTableMockDTO[];
  servicingLabs: LabTypeTableMockDTO[];
  labType: LabTypeTableMockDTO;
};

const initialState: CentralStoreData = {
  tenderTypes: [] as TenderTypeTableMockDTO[],
  servicingLabs: [] as LabTypeTableMockDTO[],
  labType: {
    Id: null,
    Description: "",
    LabType: "",
    IsStoreMappingEnabled: null,
  } as LabTypeTableMockDTO,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addNewTenderType(state, actions: PayloadAction<TenderTypeTableMockDTO>) {
      state.tenderTypes.push(actions.payload);
    },

    deleteTenderType(state, actions: PayloadAction<string>) {
      const tenderTypes: TenderTypeTableMockDTO[] = [...state.tenderTypes];
      const newTenderTypeData = tenderTypes.filter(
        (eachTenderType) => eachTenderType.Id !== actions.payload
      );
      state.tenderTypes = [...newTenderTypeData];
    },

    editTenderType(state, actions: PayloadAction<TenderTypeTableMockDTO>) {
      const tenderTypesData: TenderTypeTableMockDTO[]  = [...state.tenderTypes];
      const tenderType = tenderTypesData.find(
        (eachTenderType) => eachTenderType.Id === actions.payload.Id
      );
      if (tenderType) {
        tenderType.PaymentTypeId = actions.payload.PaymentTypeId;
        tenderType.BankAccount = actions.payload.BankAccount;
        tenderType.MainAccount = actions.payload.MainAccount;
        tenderType.Description = actions.payload.Description;
      }
      state.tenderTypes = [...tenderTypesData];
    },

    emptyTenderType(state) {
      state.tenderTypes = [];
    },

    updateTenderType(state, actions: PayloadAction<TenderTypeTableMockDTO[]>) {
      state.tenderTypes = [...actions.payload];
    },

    addNewServicingLab(state, actions: PayloadAction<LabTypeTableMockDTO>) {
      state.servicingLabs.push(actions.payload);
    },

    emptyServiceLabs(state) {
      state.servicingLabs = [];
    },

    updateServicingLab(state, actions: PayloadAction<LabTypeTableMockDTO[]>) {
      state.servicingLabs = [...actions.payload];
    },

    deleteServicingLab(state, actions: PayloadAction<number>) {
      const labTypes: LabTypeTableMockDTO[] = [...state.servicingLabs];
      const newLabTypeData = labTypes.filter(
        (eachLabType) => eachLabType.Id !== +actions.payload
      );
      state.servicingLabs = [...newLabTypeData];
    },

    addNewLabType(state, actions: PayloadAction<LabTypeTableMockDTO>) {
      state.labType = actions.payload;
    },

    resetToInitialState(state) {
      state = initialState;
    },
  },
});

export const storeAction = storeSlice.actions;
