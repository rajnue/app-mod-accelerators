import { HomePage } from 'src/pages/home';
import AcUnit from '@material-ui/icons/AcUnit';

export const RouteData = [
  {
    path: '/',
    component: HomePage,
    showSideBar: true,
    showRouteInSideBar: true,
    title: 'Home',
    order: 1,
    id: 1,
    icon: AcUnit,
  },
];
