import { Container, createStyles, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import AreaChart from '../features/area-charts/AreaChart';
import CandlestickChart from '../features/candlestick-charts/CandlestickChart';

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
const Contents: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.mainContents}>
        <Grid item xl={12} xs={12}>
          <AreaChart />
        </Grid>
        <Grid item xl={12} xs={12}>
          <CandlestickChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contents;
