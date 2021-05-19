import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type NPositivesData = {
  date: string;
  npatients: number;
  adpatients: number;
};

export type NDeathsData = {
  date: string;
  ndeaths: number;
};

export const getData = createAsyncThunk<{
  nPositivesSeries: NPositivesData[];
  nDeathsSeries: NDeathsData[];
}>('cumulativeChart/getData', async (_, { rejectWithValue }) => {
  try {
    const nPositivesRes = await fetch(
      'https://data.corona.go.jp/converted-json/covid19japan-npatients.json'
    );
    const nDeathsRes = await fetch(
      'https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json'
    );
    const nPositivesSeries = await nPositivesRes.json();
    const nDeathsSeries = await nDeathsRes.json();
    return { nPositivesSeries, nDeathsSeries };
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response.value);
  }
});

const initialState: {
  nPositivesSeries: NPositivesData[];
  nDeathsSeries: NDeathsData[];
  isLoading: boolean;
} = {
  nPositivesSeries: [],
  nDeathsSeries: [],
  isLoading: false,
};

const cumulativeChartSlice = createSlice({
  name: 'cumulativeChart',
  initialState,
  reducers: {
    clearCondition: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.nPositivesSeries = action.payload.nPositivesSeries;
      state.nDeathsSeries = action.payload.nDeathsSeries;
      state.isLoading = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default cumulativeChartSlice;
