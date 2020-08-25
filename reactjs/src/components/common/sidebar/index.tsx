/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import styled from 'styled-components';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Drawer } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { RouteData } from 'src/routes/config';
import { SidebarItem } from './side-bar-item';

const iOS = false;

const SidebarComponent = (props: SidebarProps) => {
  const { opened, toggleDrawer } = props;
  const [activeRoute, setActiveRoute] = useState(undefined);
  const toggleMenu = index => setActiveRoute(activeRoute === index ? undefined : index);

  const menu = (
    <List component="div">
      {RouteData.map((route, index) => {
        // const isCurrentPath = location.pathname.indexOf(route.path) > -1;
        return <SidebarItem index={route.id} route={route} toggleMenu={toggleMenu} key={route.id} />;
      })}
    </List>
  );

  return (
    <SideBarStyle>
      <Hidden smDown>
        <Drawer
          variant="persistent"
          className="drawer-paper"
          open={opened}
          ModalProps={{
            keepMounted: false,
            className: 'modal',
            BackdropProps: {
              className: 'backdrop',
            },
            onBackdropClick: toggleDrawer,
          }}
        >
          {menu}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <SwipeableDrawer
          variant="temporary"
          className="drawer-paper"
          open={opened}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          disableBackdropTransition={!iOS}
          ModalProps={{
            keepMounted: false,
            className: 'modal',
            BackdropProps: {
              className: 'backdrop',
            },
            onBackdropClick: toggleDrawer,
          }}
        >
          {menu}
        </SwipeableDrawer>
      </Hidden>
    </SideBarStyle>
  );
};

const SideBarStyle = styled.div`
  .drawer-paper,
  .MuiDrawer-paper {
    width: ${p => p.theme.drawerWidth};
    max-width: ${p => p.theme.drawerWidth};
    height: 100%;
    z-index: ${p => p.theme.zIndex.drawer};
  }
  .badge {
    width: 20px;
    height: 20px;
    display: flex;
    z-index: 1;
    flex-wrap: wrap;
    font-size: 0.75rem;
    align-items: center;
    border-radius: 50%;
    align-content: center;
    flex-direction: row;
    justify-content: center;
  }
  .menu-link {
    position: relative;
    display: block;
  }
  .menu-item {
    padding-left: 0;
    padding-right: 0;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }
  .menu-icon {
    margin-left: 1.5em;
    margin-right: 1.5em;
  }
  .menu-sub-item {
    padding-left: 55px;
    padding-right: 55px;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }
  .menu-collapsed {
    background-color: ${p => p.theme.primary};
  }
  .menu-active {
    background-color: ${p => p.theme.primary};
  }
  menu-closed {
    background-color: 'transparent';
  }
  .caret {
    margin-left: 2em;
    margin-right: 2em;
    min-width: 0;
  }
  .primary {
    background-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
  }
  .secondary {
    background-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
  }
  .error {
    background-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
  }
`;

interface SidebarProps {
  opened?: boolean;
  toggleDrawer?: () => {};
  location?: any;
}

const SidebarWithRouter = SidebarComponent;

export const Sidebar = withWidth()(SidebarWithRouter);
