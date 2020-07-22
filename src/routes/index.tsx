import React from 'react';
import { Switch } from 'react-router';

import { RouteData } from './config';
import { Layout } from '../layout';

// import { LocationService } from '@neu_weather_ap/services/location-service';

const Routes = () => {
  return (
    <Switch>
      {RouteData.map((item, index) => {
        return (
          <Layout showSidebar={item.showRouteInSideBar} key={`routes${item.id}`} path={item.path}>
            <item.component />
          </Layout>
        );
      })}
    </Switch>
  );
};
export default Routes;
