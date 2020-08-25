import React from 'react';
import { Grid } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import StatCard from 'src/components/common/cards/stat-card/index';

export const HomePage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard type="fill" title="Campaigns" value="103" icon={<LocalOfferIcon />} color="#3f51b5" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard type="fill" title="Campaigns" value="103" icon={<LocalOfferIcon />} color="red" />
      </Grid>
    </Grid>
  );
};
