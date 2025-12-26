import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",                 // 👈 persist entire store
  storage,
  whitelist: ["auth", "theme"] // 👈 only these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
