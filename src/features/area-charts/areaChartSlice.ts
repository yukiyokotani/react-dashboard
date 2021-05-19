import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type AreaChartData = {
  date: string;
  npatients: number;
  adpatients: number;
};

export const getData = createAsyncThunk<AreaChartData[]>(
  'areaChart/getData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        // `${process.env.PUBLIC_URL}/dummy-data/area-chart.json`
        'https://data.corona.go.jp/converted-json/covid19japan-npatients.json'
      );
      const data = await response.json();
      return data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.value);
    }
  }
);

const initialState: {
  series: AreaChartData[];
  isLoading: boolean;
} = {
  series: [],
  isLoading: false,
};

const areaChartSlice = createSlice({
  name: 'areaChart',
  initialState,
  reducers: {
    clearCondition: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.series = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default areaChartSlice;
