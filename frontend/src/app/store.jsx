import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import orderReducer from "../features/order/orderSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
