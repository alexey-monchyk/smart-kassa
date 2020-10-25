import React from 'react'
import { Route } from 'react-router-dom'

import { Navigation } from '../shared';
import {
  Outlets,
  CashRegisters,
  Catalog,
  Personal,
} from '../components'

const MainContainer = () => (
  <>
    <Navigation>
      <Route path="/" component={Outlets} exact />
      <Route path="/cash-registers" component={CashRegisters} exact />
      <Route path="/personal" component={Personal} exact />
      <Route path="/catalogs" component={Catalog} exact />
      <Route path="/catalogs/:catalogId" component={Catalog} exact />
    </Navigation>
  </>
);

export default MainContainer
