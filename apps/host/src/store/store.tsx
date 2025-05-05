import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootSlice } from "./reducer/reducer";
import { intakeSlice } from "./reducer/intake.slice";
import { intakeApi } from "./reducer/intakeApi.slice";
import { cartSlice } from "./reducer/cartReducer";
import { userPermissionSlice } from "./reducer/userPermissionSlice";
import { searchAdvancedSlice } from "./reducer/searchAdvancedReducer";
import { lensSelectionSlice } from "./reducer/lensReducer";
import { exchangeMenuSlice } from "./reducer/exchangeMenuReducer";
import { storeSlice } from "./reducer/storeSetupReducer";
import { cdcViewSlice } from "./reducer/cdcViewReducer";
import { warrantyMenuSlice } from "./reducer/warrantyMenuReducer";
import { addPofReducerSlice } from "./reducer/AddPofReducer";
import { cartIdSlice } from "./reducer/cartIdReducer";
import { langCodeSlice } from "./reducer/languageCodeReducer";
import { visionIntakeSlice } from "./reducer/visionIntake.slice";
import { visionIntakeApiSlice } from "./reducer/visionIntakeApi.slice";
import { guidedSaleReducerSlice } from "./reducer/GuidedSaleReducer";
import { addPatientSlice } from "./reducer/addPatientReducer";
import { favoriteProductsSlice } from "./reducer/favorite-products";
import { headerSlice } from "./reducer/header.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

const persistedRootReducer = persistReducer(persistConfig, rootSlice.reducer);

const persistedUserPermissionReducer = persistReducer(
  persistConfig,
  userPermissionSlice.reducer
);

export const store = configureStore({
  reducer: {
    root: persistedRootReducer,
    intake: intakeSlice.reducer,
    cart: persistedCartReducer,
    [intakeApi.reducerPath]: intakeApi.reducer,
    userPermission: persistedUserPermissionReducer,
    searchAdvanced: searchAdvancedSlice.reducer,
    lensSelection: lensSelectionSlice.reducer,
    exchangeMenu: exchangeMenuSlice.reducer,
    warrantyMenu: warrantyMenuSlice.reducer,
    storeSetup: storeSlice.reducer,
    cdcView: cdcViewSlice.reducer,
    addPofReducer: addPofReducerSlice.reducer,
    cartId: cartIdSlice.reducer,
    langCode: langCodeSlice.reducer,
    visionIntake: visionIntakeSlice.reducer,
    guidedSales: guidedSaleReducerSlice.reducer,
    [visionIntakeApiSlice.reducerPath]: visionIntakeApiSlice.reducer,
    addPatient: addPatientSlice.reducer,
    favoriteProducts: favoriteProductsSlice.reducer, 
    header: headerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(intakeApi.middleware)
      .concat(visionIntakeApiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
