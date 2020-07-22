/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ListItem, ListItemIcon, Typography, capitalize } from '@material-ui/core';
import classNames from 'classnames';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const SidebarItem = (props: SideBarProps) => {
  const { route, index, toggleMenu } = props;

  const badge = badgeInfo => {
    if (!badgeInfo) {
      return <></>;
    }
    const badgeClassName = classNames('badge', {
      [`${badgeInfo.type}`]: badgeInfo.type !== 'default',
    });
    return (
      <Typography className={classNames('badge', badgeClassName)} component="div">
        {badgeInfo.value}
      </Typography>
    );
  };
  return (
    <SideBarItemStyles to={route.path} exact className="menu-link" activeClassName="menu-active" key={index}>
      <ListItem className="menu-item" button onClick={() => toggleMenu(index)}>
        <ListItemIcon>
          <route.icon className="menu-icon" />
        </ListItemIcon>
        <Typography variant="body1" className="flexSpacer">
          {capitalize(route.title)}
        </Typography>
        {badge(route.badge)}
      </ListItem>
    </SideBarItemStyles>
  );
};

interface SideBarProps {
  route: any;
  index: number;
  activeRoute?: string;
  toggleMenu: (index) => void;
}
const SideBarItemStyles = styled(NavLink)`
  text-decoration: none;
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
    margin-left: 2;
    margin-right: 2;
  }
  .menu-sub-item {
    padding-left: 55px;
    padding-right: 55px;
    padding-top: 1.5;
    padding-bottom: 1.5;
  }
  .menu-collapsed {
    background-color: '';
  }
  .menu-active {
    background-color: '';
  }
  .menu-Closed {
    background-color: transparent;
  }
  .caret {
    margin-left: 2;
    margin-right: 2;
    min-width: 0;
  }
  .primary {
    background-color: '';
    color: '';
  }
  .secondary {
    background-color: '';
    color: '';
  }
  .error {
    background-color: '';
    color: '';
  }
`;
