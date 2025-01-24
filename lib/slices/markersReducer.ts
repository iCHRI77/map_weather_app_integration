import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface markersMapList {
    markers: Place[];
}

const initialState: markersMapList = {
    markers: [],
};

interface Place {
    name: String;
    temperature: String;
    weather: String;
}

const markersMapListSlice = createSlice({
    name: 'markers',
    initialState,
    reducers: {
        AddPlace: (state, action: PayloadAction<Place>) => {
            state.markers.push(action.payload);
        },
        RemovePlace: (state, action: PayloadAction<Number>) => {
            state.markers = state.markers.filter((_, index) => index !== action.payload);

        }
    },
});

export const { AddPlace, RemovePlace } = markersMapListSlice.actions;
export default markersMapListSlice.reducer;