import React from 'react';
import Grid from '@material-ui/core/Grid';

import {
  CatalogsList,
  ProductsTable,
} from './components';

const Catalog = () => (
  <Grid container>
    <Grid item xs={3}>
      <CatalogsList />
    </Grid>
    <Grid item xs={9}>
      <ProductsTable />
    </Grid>
  </Grid>
);

export default Catalog;
