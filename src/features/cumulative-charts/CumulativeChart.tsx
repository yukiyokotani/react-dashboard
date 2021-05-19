import {
  Box,
  Card,
  colors,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import React, { useCallback, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../utils/store';
import { NPositivesData, NDeathsData, getData } from './cumulativeChartSlice';

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
const CumulativeChart: React.FC = () => {
  const classes = useStyles();

  const dispatch: AppDispatch = useDispatch();

  const isDarkTheme = useSelector<RootState, boolean>(
    (state) => state.theme.isDarkTheme
  );

  const nPositivesSeriesJson = useSelector<RootState, NPositivesData[]>(
    (state) => state.cumulativeChart.nPositivesSeries ?? []
  );

  const nDeathsSeriesJson = useSelector<RootState, NDeathsData[]>(
    (state) => state.cumulativeChart.nDeathsSeries ?? []
  );

  const series = useMemo(
    () => [
      {
        name: '累計陽性者数',
        data: nPositivesSeriesJson.map((row) => [row.date, row.npatients]),
      },
      {
        name: '累計死亡者数',
        data: nDeathsSeriesJson.map((row) => [row.date, row.ndeaths]),
      },
    ],
    [nDeathsSeriesJson, nPositivesSeriesJson]
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
        // xaxis: [
        //   {
        //     x: new Date('7 April 2020').getTime(),
        //     borderColor: '#999',
        //     label: {
        //       text: '第一次緊急事態宣言',
        //       style: {
        //         color: '#fff',
        //         background: '#f96e64',
        //       },
        //     },
        //   },
        //   {
        //     x: new Date('8 Jan 2021').getTime(),
        //     borderColor: '#999',
        //     label: {
        //       text: '第二次緊急事態宣言',
        //       style: {
        //         color: '#fff',
        //         background: '#f96e64',
        //       },
        //     },
        //   },
        //   {
        //     x: new Date('25 Apr 2021').getTime(),
        //     borderColor: '#999',
        //     label: {
        //       text: '第三次緊急事態宣言',
        //       style: {
        //         color: '#fff',
        //         background: '#f96e64',
        //       },
        //     },
        //   },
        // ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
        min: new Date('21 April 2020').getTime(),
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
          text: '人数 (人)',
          style: {
            color: isDarkTheme ? colors.grey[300] : colors.grey[900],
          },
        },
        logarithmic: true,
      },
      legend: {
        labels: {
          colors: isDarkTheme ? colors.grey[300] : colors.grey[900],
        },
      },
      tooltip: {
        theme: isDarkTheme ? 'dark' : 'light',
        x: {
          format: 'dd MMM yyyy',
        },
        y: {
          formatter: (val) => `${val} 人`,
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
  const getCumulativeChartData = useCallback(async () => {
    dispatch(getData());
  }, [dispatch]);

  // 副作用定義
  useEffect(() => {
    getCumulativeChartData();
  }, [getCumulativeChartData]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.mainContents}>
        <Grid item xl={12} xs={12}>
          <Card>
            <Box p={2}>
              <Typography variant="body1" align="center">
                COVID-19 全国累計陽性者数及び累計死亡者数推移
              </Typography>
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

export default CumulativeChart;
