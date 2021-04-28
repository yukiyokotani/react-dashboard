import {
  Box,
  Card,
  colors,
  Container,
  createStyles,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import React, { useCallback, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { CandlestickChartData, getData } from './candlestickChartSlice';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginBottom: '16px',
      overflow: 'auto',
    },
    mainContents: {
      marginTop: 0,
      marginBottom: 0,
    },
  })
);
const CandlestickChart: React.FC = () => {
  const classes = useStyles();

  const dispatch: AppDispatch = useDispatch();

  const isDarkTheme = useSelector<RootState, boolean>(
    (state) => state.theme.isDarkTheme
  );

  const seriesJson = useSelector<RootState, CandlestickChartData[]>(
    (state) => state.candlestickChart.series
  );

  const series = useMemo(
    () => [
      {
        data: seriesJson.map((row) => ({
          x: row.time,
          y: [row.value.open, row.value.high, row.value.low, row.value.close],
        })),
      },
    ],
    [seriesJson]
  );

  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        id: 'candlestick-datetime',
        type: 'candlestick',
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      grid: {
        borderColor: isDarkTheme
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.12)',
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: isDarkTheme ? colors.grey[300] : colors.grey[900],
          },
        },
        title: {
          style: {
            color: isDarkTheme ? colors.grey[300] : colors.grey[900],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: isDarkTheme ? colors.grey[300] : colors.grey[900],
          },
        },
        title: {
          style: {
            color: isDarkTheme ? colors.grey[300] : colors.grey[900],
          },
        },
      },
      tooltip: {
        theme: isDarkTheme ? 'dark' : 'light',
        x: {
          format: 'dd MMM yyyy',
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#0c78f9',
            downward: '#1de184',
          },
        },
      },
    }),
    [isDarkTheme]
  );

  // メソッド定義
  const getCandlestickChartData = useCallback(async () => {
    dispatch(getData());
  }, [dispatch]);

  // 副作用定義
  useEffect(() => {
    getCandlestickChartData();
  }, [getCandlestickChartData]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.mainContents}>
        <Grid item xl={12} xs={12}>
          <Card>
            <Box p={2}>
              <ReactApexChart
                options={options}
                series={series}
                type="candlestick"
                height={350}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CandlestickChart;
