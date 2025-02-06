import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface markersMapList {
    markers: Place[];
}

const initialState: markersMapList = {
    markers: [],
};

interface Place {
    name: string;
    temperature: string;
    weather: string;
}

const markersMapListSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        AddPlace: (state, action: PayloadAction<Place>) => {
            state.markers.push(action.payload);
        },
        RemovePlace: (state, action: PayloadAction<number>) => {
            state.markers.splice(action.payload, 1);

        }
    },
});

export const { AddPlace, RemovePlace } = markersMapListSlice.actions;
export default markersMapListSlice.reducer;