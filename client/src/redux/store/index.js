import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import authSlice from "../slices/auth";

// Combine all the imported reducers into a single root reducer
const reducers = combineReducers({
  auth: authSlice,
});

// Configuration for Redux-persist to persist the state
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Create a persisted reducer using the root reducer and the persistConfig
const persistedReducer = persistReducer(persistConfig, reducers);

// Create a Redux store with the persisted reducer and additional middleware (redux-thunk in this case)
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Create a persistor that can be used to persist and rehydrate the Redux store
export const persistor = persistStore(store);

export default store;
