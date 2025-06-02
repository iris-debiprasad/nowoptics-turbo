import { createSlice, current } from "@reduxjs/toolkit";

interface StepObject {
  stepNo: number;
  bundleId: number;
  bundleItemId: number;
  stepMasterProductIds: number[];
  stepAddOnsData: any[];
  stepColorData: any;
}

interface StepObjectDTO {
  [key: string]: StepObject;
}

interface LensSelectionDTO {
  step1: any[];
  step2: any[];
  step3: any[];
  step4: any[];
  masterProductids: number[];
  stepObject: StepObjectDTO;
}

const initialState: LensSelectionDTO = {
  step1: [],
  step2: [],
  step3: [],
  step4: [],
  masterProductids: [],
  stepObject: {},
};

const utilForSelectingBundleItem = (data: any) => {
  const defaultBundleItem = data?.find((item: any) => item?.IsDefault);
  const defaultBundleSubItem = defaultBundleItem?.BundleItems?.find(
    (item: { IsDefault: boolean }) => item.IsDefault
  );
  const masterProductIds: number[] = [];
  defaultBundleSubItem?.BundleItemDetails?.forEach(
    (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
      if (item.IsBundleAddon === false) {
        masterProductIds.push(item.MasterProductId);
      }
    }
  );
  return {
    bundleId: defaultBundleItem?.BundleId,
    bundleItemId: defaultBundleSubItem?.BundleItemId,
    masterProductIds,
  };
};

const stepNameByStepId = (stepId: number) => {
  const stepNameObject: { [id: number]: string } = {
    1: "step1",
    2: "step2",
    3: "step3",
  };
  return stepNameObject[stepId] ?? "";
};

export const getMasterProductIds = (currentSelectedItem: any) => {
  let currentSelectedItemMasterProductId: number[] = [];
  currentSelectedItem?.BundleItemDetails?.forEach((item: any) => {
    if (item?.IsBundleAddon === false) {
      currentSelectedItemMasterProductId.push(item?.MasterProductId);
    }
  });
  return currentSelectedItemMasterProductId;
};

export const lensSelectionSlice = createSlice({
  name: "lensSelection",
  initialState,
  reducers: {
    setStep1: (state, step1) => {
      const stepKey = 1;
      const { bundleId, bundleItemId } = state.stepObject[stepKey];
      state.step1 = step1.payload;
      if (bundleId == -1 && bundleItemId == -1) {
        let flagTrueCount = 0;
        let isAnyDefalutTrueHasBundleItemNull = false;
        step1.payload.forEach((item: any) => {
          if (item?.IsDefault) {
            flagTrueCount++;
            if (item?.BundleItems === null) {
              isAnyDefalutTrueHasBundleItemNull = true;
            }
          }
        });
        if (isAnyDefalutTrueHasBundleItemNull) return;
        if (flagTrueCount === 1) {
          const { bundleId, bundleItemId, masterProductIds } =
            utilForSelectingBundleItem(step1.payload);
          state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
          state.stepObject[stepKey].bundleId = bundleId;
          state.stepObject[stepKey].bundleItemId = bundleItemId;
          state.stepObject[stepKey].stepNo = stepKey;
        }
        if (flagTrueCount === 2) {
          const defaultBundleItems = step1.payload.find(
            (item: any) => item?.IsDefault
          );
          const firstBundleItem = defaultBundleItems[0];
          const secondBundleItem = defaultBundleItems[1];
          const firstBundleSubItem = firstBundleItem?.BundleItems?.find(
            (item: { IsDefault: boolean }) => item.IsDefault
          );
          const secondBundleSubItem = secondBundleItem?.BundleItems?.find(
            (item: { IsDefault: boolean }) => item.IsDefault
          );
          if (
            firstBundleSubItem?.DefaultPrice > secondBundleSubItem?.DefaultPrice
          ) {
            const masterProductIds: number[] = [];
            firstBundleSubItem?.BundleItemDetails?.forEach(
              (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
                if (item.IsBundleAddon === false) {
                  masterProductIds.push(item.MasterProductId);
                }
              }
            );
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleId = firstBundleItem?.BundleId;
            state.stepObject[stepKey].bundleItemId =
              firstBundleSubItem?.BundleItemId;
            state.stepObject[stepKey].stepNo = stepKey;
          } else {
            const masterProductIds: number[] = [];
            secondBundleSubItem?.BundleItemDetails?.forEach(
              (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
                if (item.IsBundleAddon === false) {
                  masterProductIds.push(item.MasterProductId);
                }
              }
            );
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleId = secondBundleItem?.BundleId;
            state.stepObject[stepKey].bundleItemId =
              secondBundleSubItem?.BundleItemId;
            state.stepObject[stepKey].stepNo = stepKey;
          }
        }
      }
    },
    setStep2: (state, step2) => {
      const stepKey = 2;
      const { bundleId, bundleItemId } = state.stepObject[stepKey];
      state.step2 = step2.payload;
      if (bundleId == -1 && bundleItemId == -1) {
        let flagTrueCount = 0;
        let isAnyDefalutTrueHasBundleItemNull = false;
        step2.payload.forEach((item: any) => {
          if (item?.IsDefault) {
            flagTrueCount++;
            if (item?.BundleItems === null) {
              isAnyDefalutTrueHasBundleItemNull = true;
            }
          }
        });
        if (isAnyDefalutTrueHasBundleItemNull) return;
        if (flagTrueCount === 1) {
          const { bundleId, bundleItemId, masterProductIds } =
            utilForSelectingBundleItem(step2.payload);
          state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
          state.stepObject[stepKey].bundleId = bundleId;
          state.stepObject[stepKey].bundleItemId = bundleItemId;
          state.stepObject[stepKey].stepNo = stepKey;
        }
        if (flagTrueCount === 2) {
          const defaultBundleItems = step2.payload.find(
            (item: any) => item?.IsDefault
          );
          const firstBundleItem = defaultBundleItems[0];
          const secondBundleItem = defaultBundleItems[1];
          const firstBundleSubItem = firstBundleItem?.BundleItems?.find(
            (item: { IsDefault: boolean }) => item.IsDefault
          );
          const secondBundleSubItem = secondBundleItem?.BundleItems?.find(
            (item: { IsDefault: boolean }) => item.IsDefault
          );
          if (
            firstBundleSubItem?.DefaultPrice > secondBundleSubItem?.DefaultPrice
          ) {
            const masterProductIds: number[] = [];
            firstBundleSubItem?.BundleItemDetails?.forEach(
              (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
                if (item.IsBundleAddon === false) {
                  masterProductIds.push(item.MasterProductId);
                }
              }
            );
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleId = firstBundleItem?.BundleId;
            state.stepObject[stepKey].bundleItemId =
              firstBundleSubItem?.BundleItemId;
            state.stepObject[stepKey].stepNo = stepKey;
          } else {
            const masterProductIds: number[] = [];
            secondBundleSubItem?.BundleItemDetails?.forEach(
              (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
                if (item.IsBundleAddon === false) {
                  masterProductIds.push(item.MasterProductId);
                }
              }
            );
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleId = secondBundleItem?.BundleId;
            state.stepObject[stepKey].bundleItemId =
              secondBundleSubItem?.BundleItemId;
            state.stepObject[stepKey].stepNo = stepKey;
          }
        }
      }
    },
    setStep3: (state, step3) => {
      const stepKey = 3;
      const { bundleId, bundleItemId } = state.stepObject[stepKey];
      state.step3 = step3.payload;
      if (bundleId == -1 && bundleItemId == -1) {
        let flagTrueCount = 0;
        let isAnyDefalutTrueHasBundleItemNull = false;
        step3.payload.forEach((item: any) => {
          if (item?.IsDefault) {
            flagTrueCount++;
            if (item?.BundleItems === null) {
              isAnyDefalutTrueHasBundleItemNull = true;
            }
          }
        });
        if (isAnyDefalutTrueHasBundleItemNull) return;
        if (flagTrueCount === 1) {
          const { bundleId, bundleItemId, masterProductIds } =
            utilForSelectingBundleItem(step3.payload);
          state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
          state.stepObject[stepKey].bundleId = bundleId;
          state.stepObject[stepKey].bundleItemId = bundleItemId;
          state.stepObject[stepKey].stepNo = stepKey;
        }
        if (flagTrueCount === 2) {
          const defaultBundleItems = step3.payload.find(
            (item: any) => item?.IsDefault
          );
          const firstBundleItem = defaultBundleItems[0];
          const secondBundleItem = defaultBundleItems[1];
          const firstBundleSubItem = firstBundleItem?.BundleItems?.find(
            (item: { IsDefault: boolean }) => item.IsDefault
          );
          const secondBundleSubItem = secondBundleItem?.BundleItems?.find(
            (item: { IsDefault: boolean }) => item.IsDefault
          );
          if (
            firstBundleSubItem?.DefaultPrice > secondBundleSubItem?.DefaultPrice
          ) {
            const masterProductIds: number[] = [];
            firstBundleSubItem?.BundleItemDetails?.forEach(
              (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
                if (item.IsBundleAddon === false) {
                  masterProductIds.push(item.MasterProductId);
                }
              }
            );
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleId = firstBundleItem?.BundleId;
            state.stepObject[stepKey].bundleItemId =
              firstBundleSubItem?.BundleItemId;
            state.stepObject[stepKey].stepNo = stepKey;
          } else {
            const masterProductIds: number[] = [];
            secondBundleSubItem?.BundleItemDetails?.forEach(
              (item: { IsBundleAddon: boolean; MasterProductId: number }) => {
                if (item.IsBundleAddon === false) {
                  masterProductIds.push(item.MasterProductId);
                }
              }
            );
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleId = secondBundleItem?.BundleId;
            state.stepObject[stepKey].bundleItemId =
              secondBundleSubItem?.BundleItemId;
            state.stepObject[stepKey].stepNo = stepKey;
          }
        }
      } else if (bundleId !== -1 && bundleItemId !== -1) {
        const bundleItem = step3.payload.find(
          (item: { BundleId: number }) => item?.BundleId == bundleId
        );

        if (bundleItem) {
          const preselectedBundleItem = bundleItem?.BundleItems?.find(
            (item: { BundleItemId: number }) =>
              item?.BundleItemId == bundleItemId
          );
          if (!preselectedBundleItem) {
            const defaultBundleItem = bundleItem?.BundleItems?.find(
              (item: { IsDefault: boolean }) => item?.IsDefault
            );
            const masterProductIds: number[] = [];
            defaultBundleItem?.BundleItemDetails?.forEach((item: any) => {
              if (item?.IsBundleAddon == false) {
                masterProductIds.push(item.MasterProductId);
              }
            });
            state.stepObject[stepKey].stepMasterProductIds = masterProductIds;
            state.stepObject[stepKey].bundleItemId =
              defaultBundleItem?.BundleItemId;
          }
        }
      }
    },
    initiateStepObject: (state, stepObject) => {
      const { keys } = stepObject.payload;
      const temp = {} as StepObjectDTO;
      keys.forEach((key: string) => {
        temp[key] = {
          stepNo: -1,
          bundleId: -1,
          bundleItemId: -1,
          stepMasterProductIds: [],
          stepAddOnsData: [],
          stepColorData: null,
        };
      });
      state.stepObject = temp;
    },
    setBundleIdByStepId: (state, action) => {
      const { stepId, bundleId } = action.payload;
      state.stepObject[stepId].bundleId = bundleId;
      state.stepObject[stepId].stepNo = parseInt(stepId);
    },
    setBundleItemIdByStepId: (state, action) => {
      const { stepId, bundleItemId } = action.payload;
      const oldBundleItemId = state.stepObject[stepId].bundleItemId;
      state.stepObject[stepId].bundleItemId = bundleItemId;
      if (bundleItemId !== -1 && oldBundleItemId !== bundleItemId) {
        state.stepObject[stepId].stepNo = parseInt(stepId);
        state.stepObject[stepId].stepAddOnsData = [];
        state.stepObject[stepId].stepColorData = null;
      }
    },
    flushStepProductData: (state, action) => {
      const { stepId } = action.payload;
      state.stepObject[stepId].stepMasterProductIds = [];
      state.stepObject[stepId].stepAddOnsData = [];
      state.stepObject[stepId].stepColorData = null;
    },
    setStepMasterProductIdsByStepId: (state, action) => {
      const { stepId, masterProductIds } = action.payload;
      state.stepObject[stepId].stepMasterProductIds = masterProductIds;
    },
    updateAddOnData: (state, action) => {
      const { stepId, stepData } = action.payload;
      state.stepObject[stepId] = stepData;
    },
    getAddOnDataFromApi: (state, action) => {
      const { stepId, addonData } = action.payload;
      state.stepObject[stepId].stepAddOnsData.push(addonData);
      state.stepObject[stepId].stepMasterProductIds.push(
        addonData.MasterProductId
      );
    },
    updateColorData: (state, action) => {
      const { stepId, stepColorData, currentSelectedItem } = action.payload;
      const masterProductIds = getMasterProductIds(currentSelectedItem);
      state.stepObject[stepId].stepMasterProductIds = [
        ...masterProductIds,
        stepColorData?.MasterProductId,
      ];
      state.stepObject[stepId].stepColorData = stepColorData;
      state.stepObject[stepId].stepAddOnsData = [];
    },
    updateLevelData: (state, action) => {
      const {
        masterProductId,
        levelData,
        stepId,
        currentSelectedItem,
        colorName,
      } = action.payload;
      const masterProductIds = getMasterProductIds(currentSelectedItem);
      state.stepObject[stepId].stepMasterProductIds = [
        ...masterProductIds,
        masterProductId,
      ];
      if (levelData)
        state.stepObject[stepId].stepColorData = {
          level: levelData,
          colorName,
        };
    },
    flushEntireStepData: (state, action) => {
      const { stepId } = action.payload;
      const stepName = stepNameByStepId(stepId);
      if (stepId >= 4) return;
      state.stepObject[stepId] = {
        stepNo: -1,
        bundleId: -1,
        bundleItemId: -1,
        stepMasterProductIds: [],
        stepAddOnsData: [],
        stepColorData: null,
      };
      if (stepName) {
        Object.assign(state, {
          ...state,
          [stepName]: [],
        });
      }
    },
    flushForwardStepFromCurrentStep: (state, action) => {
      const { stepId, totalSteps } = action.payload;
      totalSteps.forEach((step: string) => {
        const nextStep = parseInt(step);
        if (nextStep > stepId) {
          state.stepObject[nextStep] = {
            stepNo: -1,
            bundleId: -1,
            bundleItemId: -1,
            stepMasterProductIds: [],
            stepAddOnsData: [],
            stepColorData: null,
          };
        }
      });
    },
    resetStateToInitial: (state) => {
      Object.assign(state, initialState);
    },
  },
});
