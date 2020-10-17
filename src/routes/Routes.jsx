import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import MainContainer from './MainContainer'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={MainContainer} />
    </Switch>
  </BrowserRouter>
)

export default Routes
