import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type CandlestickChartData = {
  time: number;
  value: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
};

export const getData = createAsyncThunk<CandlestickChartData[]>(
  'candlestickChart/getData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.PUBLIC_URL}/dummy-data/candlestick-chart.json`
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
  series: CandlestickChartData[];
  isLoading: boolean;
} = {
  series: [],
  isLoading: false,
};

const candlestickChartSlice = createSlice({
  name: 'candlestickChart',
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

export default candlestickChartSlice;
