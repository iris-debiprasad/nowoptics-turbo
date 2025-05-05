import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SaveVisionIntakeRequest } from "@/types/visionIntake.types";

export const GetVisionIntakeStepByIndex = createSelector(
  (state: RootState) => state.visionIntake.steps,
  (_: RootState, index: number) => index,
  (steps, index) => steps.find((step) => step.index === index)
);

export const GetVisionFormErrors = createSelector(
  (state: RootState) => state.visionIntake.formErrors,
  (formErrors) => {
    return formErrors.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {} as Record<keyof SaveVisionIntakeRequest["data"], typeof formErrors[0]>);
  }
);
