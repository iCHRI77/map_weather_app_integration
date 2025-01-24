import { configureStore } from '@reduxjs/toolkit';
import markersReducer from './slices/markersReducer'; // Reducer de ejemplo

export const store = configureStore({
    reducer: {
        markersMapList: markersReducer, // Aquí puedes agregar más reducers
    },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
