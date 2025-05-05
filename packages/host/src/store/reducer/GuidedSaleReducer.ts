import { selectPatientDataTypes } from "@root/host/src/types/selectPatientAssociateModal.types";
import { createSlice } from "@reduxjs/toolkit";

export const guidedSaleReducerSlice = createSlice({
    name: "guidedSalesReducer",
    initialState: {
        data: {
            communicationUserId: "",
            threadId: "",
            patientId: "",
            patientName: "",
            email: "",
            phone: "",
            initialName: "",
        },
        state: {
            currentStep: -1
        }
    },
    reducers: {
        ADD_AGENT_DATA: (state, action) => {
            state.data = { ...action.payload, initialName: action.payload.patientName };
        },
        UPDATE_AGENT_DATA: (state, action) => {
            const patientData = action.payload as selectPatientDataTypes
            state.data = {
                ...state.data,
                patientId: patientData.Id?.toString() || '',
                patientName: `${patientData.FirstName} ${patientData.LastName}`,
                email: `${patientData.Email}`,
                phone: `${patientData.PhoneNumber.IsdCode} ${patientData.PhoneNumber.PhoneNumber}`
            }
        },
        UPDATE_GUIDED_SALE_STEP: (state, action) => {
            state.state = {
                currentStep: action.payload
            }
        }

    },
});

export const { ADD_AGENT_DATA, UPDATE_AGENT_DATA, UPDATE_GUIDED_SALE_STEP } = guidedSaleReducerSlice.actions;