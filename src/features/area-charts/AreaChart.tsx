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
import { AreaChartData, getData } from './areaChartSlice';

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
const AreaChart: React.FC = () => {
  const classes = useStyles();

  const dispatch: AppDispatch = useDispatch();

  const isDarkTheme = useSelector<RootState, boolean>(
    (state) => state.theme.isDarkTheme
  );

  const seriesJson = useSelector<RootState, AreaChartData[]>(
    (state) => state.areaChart.series
  );

  const series = useMemo(
    () => [{ data: seriesJson.map((row) => [row.time, row.value]) }],
    [seriesJson]
  );

  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        id: 'area-datetime',
        type: 'area',
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
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: '#999',
            label: {
              text: 'Support',
              style: {
                color: '#fff',
                background: '#00E396',
              },
            },
          },
        ],
        xaxis: [
          {
            x: new Date('14 Nov 2012').getTime(),
            borderColor: '#999',
            label: {
              text: 'Rally',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
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
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.9,
          opacityTo: 0.2,
          stops: [0, 100],
        },
      },
    }),
    [isDarkTheme]
  );

  // メソッド定義
  const getAreaChartData = useCallback(async () => {
    dispatch(getData());
  }, [dispatch]);

  // 副作用定義
  useEffect(() => {
    getAreaChartData();
  }, [getAreaChartData]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.mainContents}>
        <Grid item xl={12} xs={12}>
          <Card>
            <Box p={2}>
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AreaChart;
